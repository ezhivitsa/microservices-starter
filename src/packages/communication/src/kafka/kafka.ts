import {
  Kafka as Kajkajs,
  KafkaConfig,
  ProducerConfig,
  ConsumerConfig,
  EachMessagePayload,
  KafkaMessage,
  IHeaders,
} from 'kafkajs';

import { getRequestChannel, getReplyChannel, getEventChannel } from '../channels';
import { Command, Event, commandSchemas, eventSchemas } from '../proto-messages';

import { getCommandMessage, getCommandReplyMessage, getEventMessage } from './messages';
import { KafkaCommandTimeoutError } from './error';
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

interface CacheValue {
  timeoutId: NodeJS.Timeout;
  resolve: (data: any) => void;
  reject: (err: Error) => void;
}

const TIMEOUT = 5000;

export class Kafka {
  private readonly _kafka: Kajkajs;

  private readonly _producer: Producer;
  private readonly _consumer: Consumer;

  private _cacheRequest: Record<string, CacheValue> = {};
  private _cacheResponse: Record<string, any> = {};
  private _handleMessages: Set<string> = new Set();

  private _commandHandlers: Record<string, CommandHandler> = {};
  private _eventHandlers: Record<string, EventHandler> = {};

  private _subscribedToMessages = false;

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = new Producer(this._kafka, producerConfig);
    this._consumer = new Consumer(
      this._kafka,
      {
        onCommand: this._handleCommandMessage,
        onReply: this._handleReplyMessage,
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
    const result = await commandHandler(value, headers[COMMAND_MESSAGE_ID_HEADER] as string);

    this.sendReply(
      {
        data: result,
        command,
        correlationId: headers[COMMAND_MESSAGE_ID_HEADER] as string,
      },
      {
        requestId: headers[COMMAND_REQUEST_ID_HEADER] as string,
      },
    );
  }

  private _handleReplyMessage(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[REPLY_CORRELATION_ID_HEADER] as string;
    if (!this._handleMessages.has(headerMessageId)) {
      return;
    }

    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const value = commandSchema.responseSchema?.encode(message.value) || null;

    if (this._cacheRequest[headerMessageId]) {
      this._cacheRequest[headerMessageId].resolve(value);
    } else {
      this._cacheResponse[headerMessageId] = value;
    }
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

  private _handleMessage = async ({ message }: EachMessagePayload): Promise<void> => {
    if (!message.headers) {
      return;
    }

    if (message.headers[COMMAND_MESSAGE_ID_HEADER]) {
      this._handleCommandMessage(message, message.headers);
    } else if (message.headers[REPLY_CORRELATION_ID_HEADER]) {
      this._handleReplyMessage(message, message.headers);
    } else if (message.headers[EVENT_HEADER]) {
      this._handleEventMessage(message, message.headers);
    }
  };

  private async _subscribeToResponse(messageId: string): Promise<void> {
    this._handleMessages.add(messageId);

    if (this._subscribedToMessages) {
      return;
    }

    this._subscribedToMessages = true;
    await this._consumer.run({
      eachMessage: this._handleMessage,
    });
  }

  private async _subscribeToReply(responseChannel: string, messageId: string): Promise<void> {
    await this._consumer.subscribeToChannel(responseChannel);
    await this._subscribeToResponse(messageId);
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

    if (this._cacheResponse[id]) {
      return this._cacheResponse[id];
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        delete this._cacheRequest[id];
        reject(new KafkaCommandTimeoutError());
      }, TIMEOUT);

      this._cacheRequest[id] = {
        timeoutId,
        resolve,
        reject,
      };
    });
  }

  async sendReply<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    const message = getCommandReplyMessage(replyData, metadata);

    const commandSchema = commandSchemas[replyData.command];
    const responseChannel = getReplyChannel(commandSchema.channel);

    await this._producer.sendMessage({
      topic: responseChannel,
      messages: [message],
    });
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
