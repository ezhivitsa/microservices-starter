import { Command, Event, Version } from '@packages/communication';

import { Context } from './context';

export interface KafkaContext {
  command?: Command;
  event?: Event;
}

export type Next = () => Promise<void>;

export type Middleware<C extends Context = Context> = (ctx: C, next: Next) => Promise<void>;

export type ComposedMiddleware = (ctx: Context, next?: Next) => Promise<void>;

export interface ListenData {
  command?: Command;
  event?: Event;
  id: string;
  version: Version;
  requestId?: string;
  data?: any;
  responseChannel?: string;
}

export enum RequestStatus {
  Ok = 'ok',
  BadRequest = 'bad-request',
  Error = 'error',
}
