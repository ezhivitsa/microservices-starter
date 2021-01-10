import { Kafka, ConsumerConfig, KafkaMessage, IHeaders } from 'kafkajs';

import { Command, commandSchemas } from '../proto-messages';
import { getChannelKey, Version } from '../messages';
import { getRequestChannel, Channel } from '../channels';

import { ListenCommandCallback } from './types';
import { Consumer } from './consumer';
import {
  CHANNEL_HEADER,
  COMMAND_HEADER,
  COMMAND_MESSAGE_ID_HEADER,
  COMMAND_REQUEST_ID_HEADER,
  RESPONSE_CHANNEL_HEADER,
  VERSION_HEADER,
} from './constants';

export class KafkaCommandHandler {
  private readonly _consumer: Consumer;

  private _channelsToHandle = new Set<string>();
  private _commandsToHandle = new Set<string>();
  private _listenCommandCallback?: ListenCommandCallback;

  constructor(private _kafka: Kafka, consumerConfig: ConsumerConfig) {
    this._consumer = new Consumer(
      this._kafka,
      { ...consumerConfig, groupId: `${consumerConfig.groupId}-command-handler` },
      this._handleMessage,
      false,
    );
  }

  private _handleMessage = (message: KafkaMessage, headers: IHeaders): void => {
    const channel = headers[CHANNEL_HEADER] as Channel;
    const command = headers[COMMAND_HEADER] as Command;
    const version = (headers[VERSION_HEADER] as Version) || Version.v1;

    const channelKey = getChannelKey({ channel, commandOrEvent: command, version });
    const commandSchema = commandSchemas[channelKey];

    if (!this._commandsToHandle.has(channelKey)) {
      return;
    }

    const value = message.value ? commandSchema.requestSchema?.decode(message.value) || null : null;

    this._listenCommandCallback?.({
      command,
      id: headers[COMMAND_MESSAGE_ID_HEADER] as string,
      requestId: headers[COMMAND_REQUEST_ID_HEADER] as string,
      responseChannel: headers[RESPONSE_CHANNEL_HEADER] as string,
      version,
      data: value,
    });
  };

  handleCommand(channel: Channel, command: Command, version: Version): void {
    const channelKey = getChannelKey({ channel, commandOrEvent: command, version });
    const commandSchema = commandSchemas[channelKey];
    const commandChannel = getRequestChannel(commandSchema.channel);

    this._commandsToHandle.add(channelKey);
    this._channelsToHandle.add(commandChannel);
  }

  listenCommands(listenCommand: ListenCommandCallback): void {
    this._listenCommandCallback = listenCommand;
    this._consumer.subscribeToTopic(...this._channelsToHandle);
  }
}
