import { Kafka } from '../kafka';
import { CommandData, EventData } from '../kafka/types';

import { Channel } from '../channels';

import { CommandMetadata, EventMetadata } from './types';

export abstract class BaseClient<E extends Error> {
  constructor(protected _kafka: Kafka) {}

  abstract readonly _channel: Channel;

  abstract _getClientError(err: Error): E;

  protected _sendCommand<Req, Res>(req: Omit<CommandData<Req>, 'channel'>, meta: CommandMetadata): Promise<Res> {
    try {
      return this._kafka.sendCommand(
        {
          ...req,
          channel: this._channel,
        },
        meta,
      );
    } catch (err) {
      throw this._getClientError(err);
    }
  }

  protected _sendEvent<Req>(req: Omit<EventData<Req>, 'channel'>, meta: EventMetadata): void {
    this._kafka.sendEvent(
      {
        ...req,
        channel: this._channel,
      },
      meta,
    );
  }
}
