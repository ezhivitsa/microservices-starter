import { Kafka, ProducerConfig, Producer as KafkaProducer, ProducerRecord, RecordMetadata } from 'kafkajs';

export class Producer {
  private readonly _producer: KafkaProducer;

  private _connected = false;

  constructor(kafka: Kafka, producerConfig?: ProducerConfig) {
    this._producer = kafka.producer(producerConfig);
  }

  async sendMessage(record: ProducerRecord): Promise<RecordMetadata[]> {
    if (!this._connected) {
      this._connected = true;
      await this._producer.connect();
    }

    return this._producer.send(record);
  }
}
