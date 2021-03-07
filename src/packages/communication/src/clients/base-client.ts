import { Kafka } from '../kafka';
import { CommandData, EventData } from '../kafka/types';

import { Channel } from '../channels';
import { Version } from '../messages';

import { ClientCommandMetadata } from './types';

export abstract class BaseClient<E extends Error> {
  constructor(protected _kafka: Kafka) {}

  abstract readonly _channel: Channel;
  abstract readonly _version: Version;

  abstract _getClientError(err: Error): E;

  protected async _sendCommand<Req, Res>(
    req: Omit<CommandData<Req>, 'channel'>,
    meta: ClientCommandMetadata,
  ): Promise<Res> {
    try {
      const res: Res = await this._kafka.sendCommand(
        {
          ...req,
          channel: this._channel,
        },
        {
          ...meta,
          version: this._version,
        },
      );
      return res;
    } catch (err) {
      throw this._getClientError(err);
    }
  }

  protected _sendEvent<Req>(req: Omit<EventData<Req>, 'channel'>): void {
    this._kafka.sendEvent(
      {
        ...req,
        channel: this._channel,
      },
      {
        version: this._version,
      },
    );
  }
}
