import { Kafka, Command, Event } from '@packages/communication';

import { compose } from './utils';
import { Context } from './context';

import { Middleware, ComposedMiddleware, Next, ListenData } from './types';

export class KoaKafka<S extends Record<string, any> = Record<string, any>> {
  private _middlewares: Middleware[] = [];

  constructor(private _kafka: Kafka) {}

  private _respond(ctx: Context<S>): void {
    const { body } = ctx;

    if (body === undefined || !ctx.command) {
      return;
    }

    this._kafka.sendReply(
      {
        data: body,
        command: ctx.command,
        correlationId: ctx.id,
      },
      {
        requestId: ctx.requestId || '',
      },
    );
  }

  private _handleRequest(ctx: Context<S>, fnMiddleware: ComposedMiddleware): Promise<void> {
    const onerror = (err: Error): void => ctx.onerror(err);
    const handleResponse = (): void => this._respond(ctx);

    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  private _callback(): (data: ListenData) => void {
    const fn = compose(this._middlewares);

    return (data: ListenData) => {
      const ctx = new Context<S>(this._kafka, data);
      return this._handleRequest(ctx, fn);
    };
  }

  listen(): void {
    const callback = this._callback();

    this._kafka.listenCommand(callback);
    this._kafka.listenEvent(callback);
  }

  use(fn: Middleware): KoaKafka {
    this._middlewares.push(fn);
    return this;
  }

  handleCommand(command: Command, handler: Middleware): KoaKafka {
    const middleware = async (ctx: Context, next: Next): Promise<void> => {
      if (ctx.command === command) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware);
    return this;
  }

  handleEvent(event: Event, handler: Middleware): KoaKafka {
    const middleware = async (ctx: Context, next: Next): Promise<void> => {
      if (ctx.event === event) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware);
    return this;
  }
}
