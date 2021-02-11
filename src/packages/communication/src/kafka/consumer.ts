import { Kafka, ConsumerConfig, Consumer as KafkaConsumer, KafkaMessage, IHeaders, EachMessagePayload } from 'kafkajs';

const DEFAULT_SESSION_TIMEOUT = 30000;

type HandlerType = (message: KafkaMessage, headers: IHeaders) => Promise<void> | void;

export class Consumer {
  private readonly _consumer: KafkaConsumer;
  private readonly _sessionTimeout: number;
  private _lastHeartbeat = 0;

  constructor(
    kafka: Kafka,
    consumerConfig: ConsumerConfig,
    private _messageHandler: HandlerType,
    private _fromBeginning = false,
    handleHeartbeat = false,
  ) {
    this._sessionTimeout = consumerConfig.sessionTimeout || DEFAULT_SESSION_TIMEOUT;
    this._consumer = kafka.consumer({
      ...consumerConfig,
      sessionTimeout: this._sessionTimeout,
    });

    if (handleHeartbeat) {
      const { HEARTBEAT } = this._consumer.events;
      this._consumer.on(HEARTBEAT, ({ timestamp }) => (this._lastHeartbeat = timestamp));
    }
  }

  async subscribeToTopic(...topics: string[]): Promise<void> {
    if (!topics.length) {
      return;
    }

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
      const headerValue = headers[header];

      if (headerValue) {
        messageHeaders[header] = headerValue.toString();
      }
    });

    this._messageHandler(message, messageHeaders);
  };

  async isHealthy(): Promise<boolean> {
    // Consumer has heartbeat within the session timeout,
    // so it is healthy
    if (Date.now() - this._lastHeartbeat < this._sessionTimeout) {
      return true;
    }

    // Consumer has not heartbeat, but maybe it's because the group is currently rebalancing
    try {
      const { state } = await this._consumer.describeGroup();

      return ['CompletingRebalance', 'PreparingRebalance'].includes(state);
    } catch (err) {
      return false;
    }
  }
}
