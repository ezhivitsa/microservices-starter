import { Command, Event } from '@packages/communication';

export interface KafkaContext {
  command?: Command;
  event?: Event;
}

export interface Context {
  body: any;
  kafka: KafkaContext;
}

export type Next = () => Promise<void>;

export type Middleware = (ctx: Context, next: Next) => Promise<void>;
