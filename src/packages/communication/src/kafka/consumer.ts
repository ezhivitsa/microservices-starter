import { Kafka, ConsumerConfig, Consumer as KafkaConsumer, KafkaMessage, IHeaders, EachMessagePayload } from 'kafkajs';

import { isMessageCommand, isMessageReply, isMessageReplyError, isMessageEvent } from './messages';

type HandlerType = (message: KafkaMessage, headers: IHeaders) => Promise<void> | void;

interface MessageHandlers {
  onCommand: HandlerType;
  onReply: HandlerType;
  onReplyError: HandlerType;
  onEvent: HandlerType;
}

export class Consumer {
  private readonly _consumer: KafkaConsumer;
  private readonly _messageHandlers: MessageHandlers;

  private _connected = false;
  private _subscribedToMessages = false;
  private _channelSubscriptions: Set<string> = new Set();

  constructor(kafka: Kafka, handlers: MessageHandlers, consumerConfig?: ConsumerConfig) {
    this._consumer = kafka.consumer(consumerConfig);
    this._messageHandlers = handlers;

    this._subscribeToMessages();
  }

  private _handleMessage = async ({ message }: EachMessagePayload): Promise<void> => {
    if (!message.headers) {
      return;
    }

    const { headers } = message;

    let handler: HandlerType | undefined;

    if (isMessageCommand(headers)) {
      handler = this._messageHandlers.onCommand;
    } else if (isMessageReplyError(headers)) {
      handler = this._messageHandlers.onReplyError;
    } else if (isMessageReply(headers)) {
      handler = this._messageHandlers.onReply;
    } else if (isMessageEvent(headers)) {
      handler = this._messageHandlers.onEvent;
    }

    if (handler) {
      handler(message, headers);
    }
  };

  private _subscribeToMessages(): void {
    if (this._subscribedToMessages) {
      return;
    }

    this._subscribedToMessages = true;
    this._consumer.run({
      eachMessage: this._handleMessage,
    });
  }

  async subscribeToChannel(channel: string): Promise<void> {
    if (!this._connected) {
      this._connected = true;
      await this._consumer.connect();
    }

    if (this._channelSubscriptions.has(channel)) {
      return;
    }

    await this._consumer.subscribe({ topic: channel });
    this._channelSubscriptions.add(channel);
  }
}
