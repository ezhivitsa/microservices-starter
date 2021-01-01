import { Kafka, ProducerConfig, ConsumerConfig, KafkaMessage, IHeaders, Message } from 'kafkajs';
import { v4 } from 'uuid';

import { Command, commandSchemas, errorSchema } from '../proto-messages';
import { getChannelKey, Version } from '../messages';
import { getRequestChannel } from '../channels';

import {
  getCommandMessage,
  getCommandReplyMessage,
  getCommandReplyErrorMessage,
  isMessageReply,
  isMessageReplyError,
} from './messages';
import { CommandData, CommandMetadata, ReplyData } from './types';
import { KafkaHandlerError } from './errors';

import { Producer } from './producer';
import { Consumer } from './consumer';
import { PromiseProvider } from './promise-provider';

import { COMMAND_HEADER, REPLY_CORRELATION_ID_HEADER, VERSION_HEADER } from './constants';

export const getResponseChannel = (groupId: string): string => `${groupId}-response`;

export class KafkaCommand {
  private readonly _producer: Producer;
  private readonly _consumer: Consumer;

  private readonly _promiseProviders = new PromiseProvider();
  private _handleReplyMessages: Set<string> = new Set();

  private readonly _responseChannel: string;

  constructor(private _kafka: Kafka, consumerConfig: ConsumerConfig, producerConfig?: ProducerConfig) {
    this._responseChannel = getResponseChannel(consumerConfig.groupId);

    this._producer = new Producer(this._kafka, producerConfig);
    this._consumer = new Consumer(
      this._kafka,
      { ...consumerConfig, groupId: `${consumerConfig.groupId}-command-${v4()}` },
      this._handleMessage,
    );
    this._consumer.subscribeToTopic(this._responseChannel);
  }

  private _handleMessage = (message: KafkaMessage, headers: IHeaders): void => {
    if (isMessageReplyError(headers)) {
      this._handleReplyError(message, headers);
    } else if (isMessageReply(headers)) {
      this._handleReply(message, headers);
    }
  };

  private _handleReply(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[REPLY_CORRELATION_ID_HEADER] as string;
    if (!this._handleReplyMessages.has(headerMessageId)) {
      return;
    }

    const command = headers[COMMAND_HEADER] as Command;
    const version = (headers[VERSION_HEADER] as Version) || Version.v1;
    const commandSchema = commandSchemas[getChannelKey(command, version)];

    const value = message.value ? commandSchema.responseSchema?.decode(message.value).data || null : null;
    this._promiseProviders.resolve(headerMessageId, value);
  }

  private _handleReplyError(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[REPLY_CORRELATION_ID_HEADER] as string;
    if (!this._handleReplyMessages.has(headerMessageId)) {
      return;
    }

    const value = message.value ? errorSchema.decode(message.value) || null : null;
    this._promiseProviders.reject(headerMessageId, value);
  }

  async sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    const { message, id } = getCommandMessage(commandData, this._responseChannel, metadata);

    const commandSchema = commandSchemas[getChannelKey(commandData.command, metadata.version)];
    const requestChannel = getRequestChannel(commandSchema.channel);

    this._handleReplyMessages.add(id);

    await this._producer.sendMessage({
      topic: requestChannel,
      messages: [message],
    });

    return this._promiseProviders.create(id);
  }

  private async _sendReplyMessage(message: Message, responseChannel: string): Promise<void> {
    await this._producer.sendMessage({
      topic: responseChannel,
      messages: [message],
    });
  }

  async sendReply<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    const message = getCommandReplyMessage(replyData, metadata);
    await this._sendReplyMessage(message, metadata.responseChannel);
  }

  async sendReplyError(errorData: ReplyData<KafkaHandlerError>, metadata: CommandMetadata): Promise<void> {
    const message = getCommandReplyErrorMessage(errorData, metadata);
    await this._sendReplyMessage(message, metadata.responseChannel);
  }
}
