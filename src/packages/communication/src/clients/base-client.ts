import { Kafka } from '../kafka';
import { CommandData, EventData } from '../kafka/types';

import { Channel } from '../channels';
import { Version } from '../messages';

import { CommandMetadata } from './types';

interface ClientOptions {
  version: Version;
}

export abstract class BaseClient<E extends Error> {
  constructor(protected _kafka: Kafka, protected _options: ClientOptions) {}

  abstract readonly _channel: Channel;

  abstract _getClientError(err: Error): E;

  protected async _sendCommand<Req, Res>(req: Omit<CommandData<Req>, 'channel'>, meta: CommandMetadata): Promise<Res> {
    try {
      const res: Res = await this._kafka.sendCommand(
        {
          ...req,
          channel: this._channel,
        },
        {
          ...meta,
          version: this._options.version,
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
        version: this._options.version,
      },
    );
  }
}
