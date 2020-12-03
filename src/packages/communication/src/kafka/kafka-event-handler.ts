import { Kafka, ConsumerConfig, KafkaMessage, IHeaders } from 'kafkajs';

import { Event, eventSchemas } from '../proto-messages';
import { getChannelKey, Version } from '../messages';
import { getEventChannel } from '../channels';

import { ListenEventCallback } from './types';
import { Consumer } from './consumer';
import { EVENT_HEADER, EVENT_ID_HEADER, RESPONSE_CHANNEL_HEADER, VERSION_HEADER } from './constants';

export class KafkaEventHandler {
  private readonly _consumer: Consumer;

  private _channelsToHandle = new Set<string>();
  private _eventsToHandle = new Set<string>();
  private _listenEventCallback?: ListenEventCallback;

  constructor(private _kafka: Kafka, consumerConfig: ConsumerConfig) {
    this._consumer = new Consumer(
      this._kafka,
      { ...consumerConfig, groupId: `${consumerConfig.groupId}-event-handler` },
      this._handleMessage,
      true,
    );
  }

  private _handleMessage = (message: KafkaMessage, headers: IHeaders): void => {
    const event = headers[EVENT_HEADER] as Event;
    const version = (headers[VERSION_HEADER] as Version) || Version.v1;

    const channelKey = getChannelKey(event, version);
    const eventSchema = eventSchemas[channelKey];

    if (!this._eventsToHandle.has(channelKey)) {
      return;
    }

    const value = message.value ? eventSchema.schema?.decode(message.value) || null : null;
    this._listenEventCallback?.({
      id: headers[EVENT_ID_HEADER] as string,
      version,
      event,
      responseChannel: headers[RESPONSE_CHANNEL_HEADER] as string,
      data: value,
    });
  };

  handleEvent(event: Event, version: Version): void {
    const channelKey = getChannelKey(event, version);
    const eventSchema = eventSchemas[channelKey];
    const eventChannel = getEventChannel(eventSchema.channel);

    this._eventsToHandle.add(channelKey);
    this._channelsToHandle.add(eventChannel);
  }

  listenEvents(listenEvent: ListenEventCallback): void {
    this._listenEventCallback = listenEvent;
    this._consumer.subscribeToTopic(...this._channelsToHandle);
  }
}
