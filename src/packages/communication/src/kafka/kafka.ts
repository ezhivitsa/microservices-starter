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
import { getChannelKey, Version } from '../messages';

import { getCommandMessage, getCommandReplyMessage, getEventMessage, getCommandReplyErrorMessage } from './messages';
import {
  CommandData,
  CommandMetadata,
  EventMetadata,
  ReplyData,
  EventData,
  ListenCommandCallback,
  ListenEventCallback,
} from './types';
import {
  COMMAND_HEADER,
  COMMAND_MESSAGE_ID_HEADER,
  COMMAND_REQUEST_ID_HEADER,
  REPLY_CORRELATION_ID_HEADER,
  EVENT_HEADER,
  EVENT_ID_HEADER,
  VERSION_HEADER,
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

  private _commandsToHandle: Set<Command> = new Set();
  private _eventsToHandle: Set<Event> = new Set();

  private _listenCommandCallback?: ListenCommandCallback;
  private _listenEventCallback?: ListenEventCallback;

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
    const version = (headers[VERSION_HEADER] as Version) || Version.v1;
    const commandSchema = commandSchemas[getChannelKey(command, version)];

    if (!this._commandsToHandle.has(command)) {
      return;
    }

    const value = message.value ? commandSchema.requestSchema?.decode(message.value) || null : null;

    this._listenCommandCallback?.({
      command,
      id: headers[COMMAND_MESSAGE_ID_HEADER] as string,
      requestId: headers[COMMAND_REQUEST_ID_HEADER] as string,
      version,
      data: value,
    });
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
    const version = (headers[VERSION_HEADER] as Version) || Version.v1;
    const eventSchema = eventSchemas[getChannelKey(event, version)];

    if (!this._eventsToHandle.has(event)) {
      return;
    }

    const value = message.value ? eventSchema.schema?.decode(message.value) || null : null;
    this._listenEventCallback?.({
      id: headers[EVENT_ID_HEADER] as string,
      version,
      event,
      data: value,
    });
  }

  private async _subscribeToReply(responseChannel: string, messageId: string): Promise<void> {
    await this._consumer.subscribeToChannel(responseChannel);

    this._handleReplyMessages.add(messageId);
  }

  async sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    const { message, id } = getCommandMessage(commandData, metadata);

    const commandSchema = commandSchemas[getChannelKey(commandData.command, metadata.version)];

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

  async sendEvent<D>(eventData: EventData<D>, metadata: EventMetadata): Promise<void> {
    const eventSchema = eventSchemas[getChannelKey(eventData.event, metadata.version)];
    const eventChannel = getEventChannel(eventSchema.channel);

    const message = getEventMessage(eventData, metadata);

    await this._producer.sendMessage({
      topic: eventChannel,
      messages: [message],
    });
  }

  handleCommand(command: Command): void {
    this._commandsToHandle.add(command);
  }

  handleEvent(event: Event): void {
    this._eventsToHandle.add(event);
  }

  listenCommand(listenCallback: ListenCommandCallback): void {
    this._listenCommandCallback = listenCallback;
  }

  listenEvent(listenEvent: ListenEventCallback): void {
    this._listenEventCallback = listenEvent;
  }
}
