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
  EachMessagePayload,
  KafkaMessage,
  IHeaders,
} from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { getRequestChannel, getReplyChannel, getEventChannel } from '../channels';
import { Command, Event, commandSchemas, eventSchemas } from '../proto-messages';

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

interface EventData<D> {
  data: D;
  event: Event;
}

interface CacheValue {
  timeoutId: NodeJS.Timeout;
  resolve: (data: any) => void;
  reject: (err: Error) => void;
}

type CommandHandler = <D, R>(data: D, messageId: string) => Promise<R>;
type EventHandler = <D>(data: D, eventId: string) => void;

const TIMEOUT = 5000;

const MESSAGE_ID_HEADER = 'message-id';
const REQUEST_ID_HEADER = 'request-id';
const COMMAND_HEADER = 'command';
const RESPONSE_CHANNEL_HEADER = 'return-channel';
const CORRELATION_ID_HEADER = 'correlation-id';

const EVENT_HEADER = 'event';
const EVENT_ID_HEADER = 'event-id';

export class Kafka {
  private readonly _kafka: Kajkajs;

  private readonly _producer: Producer;
  private readonly _consumer: Consumer;

  private _cacheRequest: Record<string, CacheValue> = {};
  private _cacheResponse: Record<string, any> = {};
  private _channelSubscriptions: Set<string> = new Set();
  private _handleMessages: Set<string> = new Set();

  private _commandHandlers: Record<string, CommandHandler> = {};
  private _eventHandlers: Record<string, EventHandler> = {};

  private _producerConnected = false;
  private _consumerConnected = false;
  private _subscribedToMessages = false;

  constructor(config: KafkaConfig, producerConfig?: ProducerConfig, consumerConfig?: ConsumerConfig) {
    this._kafka = new Kajkajs(config);

    this._producer = this._kafka.producer(producerConfig);
    this._consumer = this._kafka.consumer(consumerConfig);
  }

  private _getCommandMessage<D>(
    commandData: CommandData<D>,
    metadata: CommandMetadata,
  ): {
    message: Message;
    id: string;
  } {
    const commandSchema = commandSchemas[commandData.command];
    const responseChannel = getReplyChannel(commandSchema.channel);

    const messageId = uuidv4();

    const message = {
      value: commandSchema.requestSchema?.encode(commandData.data) || null,
      headers: {
        [MESSAGE_ID_HEADER]: messageId,
        [REQUEST_ID_HEADER]: metadata.requestId,
        [COMMAND_HEADER]: commandData.command,
        [RESPONSE_CHANNEL_HEADER]: responseChannel,
      },
    };

    return {
      id: messageId,
      message,
    };
  }

  private _getCommandReplyMessage<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Message {
    const commandSchema = commandSchemas[replyData.command];

    return {
      value: commandSchema.requestSchema?.encode(replyData.data) || null,
      headers: {
        [REQUEST_ID_HEADER]: metadata.requestId,
        [CORRELATION_ID_HEADER]: replyData.correlationId,
        [COMMAND_HEADER]: replyData.command,
      },
    };
  }

  private async _handleCommandMessage(message: KafkaMessage, headers: IHeaders): Promise<void> {
    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const commandHandler = this._commandHandlers[command];
    if (!commandHandler) {
      return;
    }

    const value = message.value ? commandSchema.requestSchema?.decode(message.value) || null : null;
    const result = await commandHandler(value, headers[MESSAGE_ID_HEADER] as string);

    this.sendReply(
      {
        data: result,
        command,
        correlationId: headers[MESSAGE_ID_HEADER] as string,
      },
      {
        requestId: headers[REQUEST_ID_HEADER] as string,
      },
    );
  }

  private _handleReplyMessage(message: KafkaMessage, headers: IHeaders): void {
    const headerMessageId = headers[CORRELATION_ID_HEADER] as string;
    if (!this._handleMessages.has(headerMessageId)) {
      return;
    }

    const command = headers[COMMAND_HEADER] as Command;
    const commandSchema = commandSchemas[command];

    const value = commandSchema.responseSchema?.encode(message.value) || null;

    if (this._cacheRequest[headerMessageId]) {
      this._cacheRequest[headerMessageId].resolve(value);
    } else {
      this._cacheResponse[headerMessageId] = value;
    }
  }

  private _handleMessage = async ({ message }: EachMessagePayload): Promise<void> => {
    if (!message.headers) {
      return;
    }

    if (message.headers[MESSAGE_ID_HEADER]) {
      this._handleCommandMessage(message, message.headers);
    } else if (message.headers[CORRELATION_ID_HEADER]) {
      this._handleReplyMessage(message, message.headers);
    }
  };

  private async _sendMessage(record: ProducerRecord): Promise<RecordMetadata[]> {
    if (!this._producerConnected) {
      this._producerConnected = true;
      await this._producer.connect();
    }

    return this._producer.send(record);
  }

  private async _subscribeToChannel(channel: string): Promise<void> {
    if (!this._consumerConnected) {
      this._consumerConnected = true;
      await this._consumer.connect();
    }

    if (this._channelSubscriptions.has(channel)) {
      return;
    }

    await this._consumer.subscribe({ topic: channel });
    this._channelSubscriptions.add(channel);
  }

  private async _subscribeToResponse(messageId: string): Promise<void> {
    this._handleMessages.add(messageId);

    if (this._subscribedToMessages) {
      return;
    }

    this._subscribedToMessages = true;
    await this._consumer.run({
      eachMessage: this._handleMessage,
    });
  }

  private async _subscribeToReply(responseChannel: string, messageId: string): Promise<void> {
    await this._subscribeToChannel(responseChannel);
    await this._subscribeToResponse(messageId);
  }

  async sendCommand<D, R>(commandData: CommandData<D>, metadata: CommandMetadata): Promise<R> {
    const { message, id } = this._getCommandMessage(commandData, metadata);

    const commandSchema = commandSchemas[commandData.command];

    const requestChannel = getRequestChannel(commandSchema.channel);
    const responseChannel = getReplyChannel(commandSchema.channel);

    await this._subscribeToReply(responseChannel, id);

    await this._sendMessage({
      topic: requestChannel,
      messages: [message],
    });

    if (this._cacheResponse[id]) {
      return this._cacheResponse[id];
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        delete this._cacheRequest[id];
        reject(new KafkaCommandTimeoutError());
      }, TIMEOUT);

      this._cacheRequest[id] = {
        timeoutId,
        resolve,
        reject,
      };
    });
  }

  async sendReply<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Promise<void> {
    const message = this._getCommandReplyMessage(replyData, metadata);

    const commandSchema = commandSchemas[replyData.command];
    const responseChannel = getReplyChannel(commandSchema.channel);

    await this._sendMessage({
      topic: responseChannel,
      messages: [message],
    });
  }

  async sendEvent<D>(eventData: EventData<D>): Promise<void> {
    const eventSchema = eventSchemas[eventData.event];

    const eventChannel = getEventChannel(eventSchema.channel);
    const message: Message = {
      value: eventSchema.schema?.encode(eventData.data) || null,
      headers: {
        [EVENT_HEADER]: eventData.event,
      },
    };

    await this._sendMessage({
      topic: eventChannel,
      messages: [message],
    });
  }

  async handleCommand(command: Command, commandHandler: CommandHandler): Promise<void> {
    this._commandHandlers[command] = commandHandler;
  }

  async handleEvent(event: Event, eventHandler: EventHandler): Promise<void> {
    this._eventHandlers[event] = eventHandler;
  }
}
