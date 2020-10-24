import { Kafka, KafkaHandlerError, Command, Event } from '@packages/communication';

import { ListenData } from './types';

export class Context {
  state = {};

  constructor(private _kafka: Kafka, private _data: ListenData) {}

  get command(): Command | undefined {
    return this._data.command;
  }

  get event(): Event | undefined {
    return this._data.event;
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
