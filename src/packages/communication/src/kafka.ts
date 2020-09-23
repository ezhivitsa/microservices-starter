import { Kafka as Kajkajs, KafkaConfig, Producer, ProducerConfig, Consumer, ConsumerConfig, Message } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { Channel } from './channels';

interface CommandMetadata {
  requestId: string;
  returnChannel?: Channel;
}

interface MessageHeader {
  'message-id': string;
  'request-id': string;
  'correlation-id'?: string;
  'return-channel'?: Channel;
}

// interface Message<D> {
//   body: D;
//   headers: MessageHeader;
// }

export class Kafka {
  private readonly _kafka: Kajkajs;

  private readonly _producer: Producer;
  private readonly _consumer: Consumer;

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = this._kafka.producer(producerConfig);
    this._consumer = this._kafka.consumer(consumerConfig);
  }

  async sendCommand<D, R>(channel: Channel, data: D, metadata: CommandMetadata): Promise<R> {
    const messageId = uuidv4();
    const message: Message = {
      value: data,
      headers: {
        'message-id': messageId,
        'request-id': metadata.requestId,
        'return-channel': metadata.returnChannel || ''
      }
    };

    this._producer.
  }

  sendEvent<D>(): void {}
}
