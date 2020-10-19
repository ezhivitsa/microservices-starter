import { Kafka, Command, Event } from '@packages/communication';

import { Middleware, Context, Next } from './types';

export class KoaKafka {
  private _middlewares: Middleware[] = [];

  constructor(private _kafka: Kafka) {}

  use(fn: Middleware): KoaKafka {
    this._middlewares.push(fn);
    return this;
  }

  handleCommand(command: Command, handler: Middleware): KoaKafka {
    const middleware = async (ctx: Context, next: Next): Promise<void> => {
      if (ctx.kafka.command === command) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware);
    return this;
  }

  handleEvent(event: Event, handler: Middleware): KoaKafka {
    const middleware = async (ctx: Context, next: Next): Promise<void> => {
      if (ctx.kafka.event === event) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware);
    return this;
  }
}
