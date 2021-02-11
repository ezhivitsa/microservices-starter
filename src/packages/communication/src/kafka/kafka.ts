import { Kafka as Kafkajs, ProducerConfig, ConsumerConfig, KafkaConfig } from 'kafkajs';

import { Command, Event } from '../proto-messages';
import { Version } from '../messages';
import { Channel } from '../channels';

import {
  CommandData,
  ReplyData,
  CommandMetadata,
  EventData,
  EventMetadata,
  ListenCommandCallback,
  ListenEventCallback,
} from './types';
import { KafkaHandlerError } from './errors';

import { KafkaCommandHandler } from './kafka-command-handler';
import { KafkaCommand } from './kafka-command';
import { KafkaEventHandler } from './kafka-event-handler';
import { KafkaEvent } from './kafka-event';

import { KafkaJsMock } from './kafka-mock';

interface Config {
  mock?: boolean;
}

export class Kafka {
  private readonly _kafka: Kafkajs;

  private readonly _kafkaCommandHandler: KafkaCommandHandler;
  private readonly _kafkaCommand: KafkaCommand;
  private readonly _kafkaEventHandler: KafkaEventHandler;
  private readonly _kafkaEvent: KafkaEvent;

  constructor(config: KafkaConfig & Config, consumerConfig: ConsumerConfig, producerConfig?: ProducerConfig) {
    this._kafka = config.mock ? ((new KafkaJsMock() as unknown) as Kafkajs) : new Kafkajs(config);

    this._kafkaCommandHandler = new KafkaCommandHandler(this._kafka, consumerConfig);
    this._kafkaCommand = new KafkaCommand(this._kafka, consumerConfig, producerConfig);
    this._kafkaEventHandler = new KafkaEventHandler(this._kafka, consumerConfig);
    this._kafkaEvent = new KafkaEvent(this._kafka, producerConfig);
  }

  sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    return this._kafkaCommand.sendCommand(commandData, metadata);
  }

  sendReply<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    return this._kafkaCommand.sendReply(replyData, metadata);
  }

  sendReplyError(errorData: ReplyData<KafkaHandlerError>, metadata: CommandMetadata): Promise<void> {
    return this._kafkaCommand.sendReplyError(errorData, metadata);
  }

  sendEvent<D>(eventData: EventData<D>, metadata: EventMetadata): Promise<void> {
    return this._kafkaEvent.sendEvent(eventData, metadata);
  }

  handleCommand(channel: Channel, command: Command, version: Version): void {
    this._kafkaCommandHandler.handleCommand(channel, command, version);
  }

  handleEvent(channel: Channel, event: Event, version: Version): void {
    this._kafkaEventHandler.handleEvent(channel, event, version);
  }

  listenCommand(listenCallback: ListenCommandCallback): void {
    this._kafkaCommandHandler.listenCommands(listenCallback);
  }

  listenEvent(listenEvent: ListenEventCallback): void {
    this._kafkaEventHandler.listenEvents(listenEvent);
  }

  isHealthy(): Promise<boolean> {
    return this._kafkaCommandHandler.isConsumerHealthy();
  }
}
