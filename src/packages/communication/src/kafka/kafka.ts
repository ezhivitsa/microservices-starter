import {
  Kafka as Kajkajs,
  KafkaConfig,
  Producer,
  ProducerConfig,
  Consumer,
  ConsumerConfig,
  Message,
  RecordMetadata,
  ProducerRecord,
} from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { getRequestChannel, getReplyChannel } from '../channels';
import { Command, commandSchemas } from '../messages';

import { KafkaCommandTimeoutError } from './error';

interface CommandMetadata {
  requestId: string;
}

interface CommandData<D> {
  data: D;
  command: Command;
}

interface ReplyData<D> extends CommandData<D> {
  correlationId: string;
}

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

  private _cache: Record<string, CacheValue> = {};

  private _producerConnected = false;

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = this._kafka.producer(producerConfig);
    this._consumer = this._kafka.consumer(consumerConfig);
  }

  private async _sendMessage(record: ProducerRecord): Promise<RecordMetadata[]> {
    if (!this._producerConnected) {
      await this._producer.connect();
      this._producerConnected = true;
    }

    return this._producer.send(record);
  }

  async sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    const commandSchema = commandSchemas[commandData.command];

    const requestChannel = getRequestChannel(commandSchema.channel);
    const responseChannel = getReplyChannel(commandSchema.channel);

    const messageId = uuidv4();
    const message: Message = {
      value: commandSchema.requestSchema?.encode(commandData.data) || null,
      headers: {
        'message-id': messageId,
        'request-id': metadata.requestId,
        command: commandData.command,
        'return-channel': responseChannel,
      },
    };

    await this._sendMessage({
      topic: requestChannel,
      messages: [message],
    });

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        delete this._cache[messageId];
        reject(new KafkaCommandTimeoutError());
      }, TIMEOUT);

      this._cache[messageId] = {
        timeoutId,
        resolve,
        reject,
      };
    });
  }

  async sendReply<D>(commandData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    const commandSchema = commandSchemas[commandData.command];

    const responseChannel = getReplyChannel(commandSchema.channel);
    const message: Message = {
      value: commandSchema.requestSchema?.encode(commandData.data) || null,
      headers: {
        'request-id': metadata.requestId,
        'correlation-id': commandData.correlationId,
        command: commandData.command,
      },
    };

    await this._sendMessage({
      topic: responseChannel,
      messages: [message],
    });
  }

  sendEvent<D>(): void {}
}
