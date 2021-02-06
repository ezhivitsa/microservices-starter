import { EventEmitter } from 'events';
import { ProducerRecord, RecordMetadata, ConsumerSubscribeTopic, ConsumerRunConfig, EachMessagePayload } from 'kafkajs';

const messageEvent = 'message';

export class ProducerMock {
  constructor(private _eventEmitter: EventEmitter) {}

  connect(): Promise<void> {
    return Promise.resolve();
  }

  send(record: ProducerRecord): Promise<RecordMetadata[]> {
    this._eventEmitter.emit(messageEvent, record);
    return Promise.resolve([
      {
        topicName: record.topic,
        partition: 1,
        errorCode: -1,
      },
    ]);
  }
}

export class ConsumerMock {
  private _topics: string[] = [];
  private _callback?: (payload: EachMessagePayload) => Promise<void>;

  constructor(eventEmitter: EventEmitter) {
    eventEmitter.on(messageEvent, (data: ProducerRecord) => {
      this._handleMessage(data);
    });
  }

  private _handleMessage(record: ProducerRecord): void {
    if (!this._callback || !this._topics.includes(record.topic)) {
      return;
    }

    record.messages.forEach(({ key, value, headers }) => {
      this._callback?.({
        topic: record.topic,
        partition: 1,
        message: {
          key: key instanceof Buffer ? key : Buffer.from(key || '', 'hex'),
          value: typeof value === 'string' ? Buffer.from(value, 'hex') : value,
          timestamp: new Date().toISOString(),
          size: 0,
          attributes: 0,
          offset: '0',
          headers,
        },
      });
    });
  }

  connect(): Promise<void> {
    return Promise.resolve();
  }

  subscribe(data: ConsumerSubscribeTopic): Promise<void> {
    this._topics.push(data.topic.toString());
    return Promise.resolve();
  }

  run(data?: ConsumerRunConfig): Promise<void> {
    if (!data || !data.eachMessage) {
      return Promise.resolve();
    }

    this._callback = data.eachMessage;
    return Promise.resolve();
  }
}

export class KafkaJsMock {
  private _eventEmitter = new EventEmitter();

  producer(): ProducerMock {
    return new ProducerMock(this._eventEmitter);
  }

  consumer(): ConsumerMock {
    return new ConsumerMock(this._eventEmitter);
  }
}
