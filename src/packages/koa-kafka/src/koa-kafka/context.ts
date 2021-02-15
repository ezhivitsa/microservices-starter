import { Kafka, KafkaHandlerError, Command, Event, Version, Channel, CommandUser } from '@packages/communication';

import { ListenData, RequestStatus } from './types';

type FinishCallback = (status: RequestStatus) => void;

export class Context<S extends Record<string, any> = Record<string, any>> {
  state: S = {} as S;

  body: any;

  private _validatedData: any;

  private _finishCallbacks: FinishCallback[] = [];

  constructor(private _kafka: Kafka, private _channel: Channel, private _data: ListenData) {}

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

  get user(): CommandUser | undefined {
    return this._data.user;
  }

  get responseChannel(): string | undefined {
    return this._data.responseChannel;
  }

  get data(): any {
    return this._validatedData || this._data.data?.data;
  }

  get dataError(): any {
    return this._data.data?.error;
  }

  set validatedData(data: any) {
    this._validatedData = data;
  }

  throw<T extends Record<string, any>>(errorData: T | KafkaHandlerError, status?: RequestStatus): void {
    if (!this._data.command) {
      return;
    }

    const data = errorData instanceof KafkaHandlerError ? errorData : new KafkaHandlerError<T>(errorData);

    this._kafka.sendReplyError(
      {
        data,
        channel: this._channel,
        command: this._data.command,
        correlationId: this._data.id,
      },
      {
        requestId: this._data.requestId || '',
        version: this._data.version,
        responseChannel: this._data.responseChannel || '',
      },
    );

    this.end(status || RequestStatus.BadRequest);
  }

  onerror(err?: Error): void {
    if (!err) {
      return;
    }

    const message = err.message;
    this.throw(new KafkaHandlerError({ message }), RequestStatus.Error);
  }

  onFinish(callback: FinishCallback): void {
    this._finishCallbacks.push(callback);
  }

  end(status: RequestStatus): void {
    for (const callback of this._finishCallbacks) {
      callback(status);
    }
  }
}
