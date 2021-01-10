import { Kafka, ProducerConfig } from 'kafkajs';

import { getChannelKey } from '../messages';
import { eventSchemas } from '../proto-messages';
import { getEventChannel } from '../channels';

import { EventMetadata, EventData } from './types';
import { Producer } from './producer';
import { getEventMessage } from './messages';

export class KafkaEvent {
  private readonly _producer: Producer;

  constructor(private _kafka: Kafka, producerConfig?: ProducerConfig) {
    this._producer = new Producer(this._kafka, producerConfig);
  }

  async sendEvent<D>(eventData: EventData<D>, metadata: EventMetadata): Promise<void> {
    const eventSchema =
      eventSchemas[
        getChannelKey({
          channel: eventData.channel,
          commandOrEvent: eventData.event,
          version: metadata.version,
        })
      ];
    const eventChannel = getEventChannel(eventSchema.channel);

    const message = getEventMessage(eventData, metadata);

    await this._producer.sendMessage({
      topic: eventChannel,
      messages: [message],
    });
  }
}
