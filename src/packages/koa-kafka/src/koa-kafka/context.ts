import { Kafka, KafkaHandlerError, Command, Event, Version } from '@packages/communication';

import { ListenData } from './types';

export class Context<S extends Record<string, any> = Record<string, any>> {
  state: S = {} as S;

  body: any;

  constructor(private _kafka: Kafka, private _data: ListenData) {}

  get command(): Command | undefined {
    return this._data.command;
  }

  get event(): Event | undefined {
    return this._data.event;
  }

  get requestId(): string | undefined {
    return this._data.requestId;
  }

  get id(): string {
    return this._data.id;
  }

  get version(): Version {
    return this._data.version;
  }

  throw(errorData: any): void {
    if (!this._data.command) {
      return;
    }

    const data = errorData instanceof KafkaHandlerError ? errorData : new KafkaHandlerError(errorData);

    this._kafka.sendReplyError(
      {
        data,
        command: this._data.command,
        correlationId: this._data.id,
      },
      {
        requestId: this._data.requestId || '',
        version: this._data.version,
      },
    );
  }

  onerror(err?: Error): void {
    if (!err) {
      return;
    }

    const message = err.message;
    this.throw(new KafkaHandlerError({ message }));
  }
}
