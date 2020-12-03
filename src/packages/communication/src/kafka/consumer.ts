import { Kafka, ConsumerConfig, Consumer as KafkaConsumer, KafkaMessage, IHeaders, EachMessagePayload } from 'kafkajs';

type HandlerType = (message: KafkaMessage, headers: IHeaders) => Promise<void> | void;

export class Consumer {
  private readonly _consumer: KafkaConsumer;

  constructor(
    kafka: Kafka,
    consumerConfig: ConsumerConfig,
    private _messageHandler: HandlerType,
    private _fromBeginning = false,
  ) {
    this._consumer = kafka.consumer(consumerConfig);
  }

  async subscribeToTopic(...topics: string[]): Promise<void> {
    if (!topics.length) {
      return;
    }

    await this._consumer.connect();
    for (let i = 0; i < topics.length; i += 1) {
      await this._consumer.subscribe({ topic: topics[i], fromBeginning: this._fromBeginning });
    }
    await this._consumer.run({
      eachMessage: this._handleMessage,
    });
  }

  private _handleMessage = async ({ message }: EachMessagePayload): Promise<void> => {
    if (!message.headers) {
      return;
    }

    const { headers } = message;

    const messageHeaders: Record<string, string> = {};
    Object.keys(headers).forEach((header) => {
      messageHeaders[header] = headers[header].toString();
    });

    this._messageHandler(message, messageHeaders);
  };
}
