import { Kafka as Kajkajs, KafkaConfig, Producer, ProducerConfig, Consumer, ConsumerConfig } from 'kafkajs';

interface CommandMetadata {
  requestId: string;
}

export class Kafka {
  private readonly _kafka: Kajkajs;

  private readonly _producer: Producer;
  private readonly _consumer: Consumer;

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = this._kafka.producer(producerConfig);
    this._consumer = this._kafka.consumer(consumerConfig);
  }

  sendCommand<D>(data: D, metadata: CommandMetadata): void {}

  sendEvent<D>(): void {}
}
