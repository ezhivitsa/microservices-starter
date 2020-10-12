import {
  Kafka as Kajkajs,
  KafkaConfig,
  ProducerConfig,
  ConsumerConfig,
  KafkaMessage,
  IHeaders,
  Message,
} from 'kafkajs';

import { getRequestChannel, getReplyChannel, getEventChannel } from '../channels';
import { Command, Event, commandSchemas, eventSchemas } from '../proto-messages';

import { getCommandMessage, getCommandReplyMessage, getEventMessage, getCommandReplyErrorMessage } from './messages';
import { CommandHandler, EventHandler, CommandData, CommandMetadata, ReplyData, EventData } from './types';
import {
  COMMAND_HEADER,
  COMMAND_MESSAGE_ID_HEADER,
  COMMAND_REQUEST_ID_HEADER,
  REPLY_CORRELATION_ID_HEADER,
  EVENT_HEADER,
  EVENT_ID_HEADER,
} from './constants';

import { Producer } from './producer';
import { Consumer } from './consumer';
import { PromiseProvider } from './promise-provider';

import { KafkaHandlerError } from './errors';

export class Kafka {
  private readonly _kafka: Kajkajs;

  private readonly _producer: Producer;
  private readonly _consumer: Consumer;
  private readonly _promiseProviders = new PromiseProvider();

  private _handleReplyMessages: Set<string> = new Set();

  private _commandHandlers: Record<string, CommandHandler> = {};
  private _eventHandlers: Record<string, EventHandler> = {};

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = new Producer(this._kafka, producerConfig);
    this._consumer = new Consumer(
      this._kafka,
      {
        onCommand: this._handleCommandMessage,
        onReply: this._handleReplyMessage,
        onReplyError: this._handleReplyErrorMessage,
        onEvent: this._handleEventMessage,
      },
      consumerConfig,
    );
  }

  private async _handleCommandMessage(message: KafkaMessage, headers: IHeaders): Promise<void> {
    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const commandHandler = this._commandHandlers[command];
    if (!commandHandler) {
      return;
    }

    const value = message.value ? commandSchema.requestSchema?.decode(message.value) || null : null;

    const commandData = {
      command,
      correlationId: headers[COMMAND_MESSAGE_ID_HEADER] as string,
    };
    const commandMetadata = {
      requestId: headers[COMMAND_REQUEST_ID_HEADER] as string,
    };

    try {
      const result = await commandHandler(value, headers[COMMAND_MESSAGE_ID_HEADER] as string);
      this.sendReply(
        {
          data: result,
          ...commandData,
        },
        commandMetadata,
      );
    } catch (error) {
      if (error instanceof KafkaHandlerError) {
        this.sendReplyError({ data: error, ...commandData }, commandMetadata);
      } else {
        throw error;
      }
    }
  }

  private _handleReplyMessage(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[REPLY_CORRELATION_ID_HEADER] as string;
    if (!this._handleReplyMessages.has(headerMessageId)) {
      return;
    }

    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const value = message.value ? commandSchema.responseSchema?.decode(message.value) || null : null;
    this._promiseProviders.resolve(headerMessageId, value);
  }

  private _handleReplyErrorMessage(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[REPLY_CORRELATION_ID_HEADER] as string;
    if (!this._handleReplyMessages.has(headerMessageId)) {
      return;
    }

    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const value = message.value ? commandSchema.errorSchema?.decode(message.value) || null : null;
    this._promiseProviders.reject(headerMessageId, value);
  }

  private _handleEventMessage(message: KafkaMessage, headers: IHeaders): void {
    const event = headers[EVENT_HEADER] as Event;
    const eventSchema = eventSchemas[event];

    const eventHandler = this._eventHandlers[event];
    if (!eventHandler) {
      return;
    }

    const value = message.value ? eventSchema.schema?.decode(message.value) || null : null;
    eventHandler(value, headers[EVENT_ID_HEADER] as string);
  }

  private async _subscribeToReply(responseChannel: string, messageId: string): Promise<void> {
    await this._consumer.subscribeToChannel(responseChannel);

    this._handleReplyMessages.add(messageId);
  }

  async sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    const { message, id } = getCommandMessage(commandData, metadata);

    const commandSchema = commandSchemas[commandData.command];

    const requestChannel = getRequestChannel(commandSchema.channel);
    const responseChannel = getReplyChannel(commandSchema.channel);

    await this._subscribeToReply(responseChannel, id);

    await this._producer.sendMessage({
      topic: requestChannel,
      messages: [message],
    });

    return this._promiseProviders.create(id);
  }

  private async _sendReplyMessage(message: Message, command: Command): Promise<void> {
    const commandSchema = commandSchemas[command];
    const responseChannel = getReplyChannel(commandSchema.channel);

    await this._producer.sendMessage({
      topic: responseChannel,
      messages: [message],
    });
  }

  async sendReply<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    const message = getCommandReplyMessage(replyData, metadata);
    await this._sendReplyMessage(message, replyData.command);
  }

  async sendReplyError(errorData: ReplyData<KafkaHandlerError>, metadata: CommandMetadata): Promise<void> {
    const message = getCommandReplyErrorMessage(errorData, metadata);
    await this._sendReplyMessage(message, errorData.command);
  }

  async sendEvent<D>(eventData: EventData<D>): Promise<void> {
    const eventSchema = eventSchemas[eventData.event];
    const eventChannel = getEventChannel(eventSchema.channel);

    const message = getEventMessage(eventData);

    await this._producer.sendMessage({
      topic: eventChannel,
      messages: [message],
    });
  }

  async handleCommand(command: Command, commandHandler: CommandHandler): Promise<void> {
    this._commandHandlers[command] = commandHandler;
  }

  async handleEvent(event: Event, eventHandler: EventHandler): Promise<void> {
    this._eventHandlers[event] = eventHandler;
  }
}
