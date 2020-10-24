import { Command, Event } from '@packages/communication';

import { Context } from './context';

export interface KafkaContext {
  command?: Command;
  event?: Event;
}

export type Next = () => Promise<void>;

export type Middleware = (ctx: Context, next: Next) => Promise<void>;

export type ComposedMiddleware = (ctx: Context, next?: Next) => Promise<void>;

export interface ListenData {
  command?: Command;
  event?: Event;
  id: string;
  requestId?: string;
  data?: any;
}
