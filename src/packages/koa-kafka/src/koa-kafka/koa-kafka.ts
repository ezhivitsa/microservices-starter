import { ObjectSchema } from 'joi';
import { Kafka, Command, Event, Version, ErrorCode } from '@packages/communication';

import { compose } from './utils';
import { Context } from './context';

import { Middleware, ComposedMiddleware, Next, ListenData } from './types';

export class KoaKafka<S extends Record<string, any> = Record<string, any>, C extends Context = Context> {
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
        version: ctx.version,
        responseChannel: ctx.responseChannel || '',
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

      if (ctx.dataError) {
        ctx.throw({
          code: ErrorCode.BAD_PROTO,
        });
        return;
      }

      return this._handleRequest(ctx, fn);
    };
  }

  private _setValidateMiddleware(schema: ObjectSchema): void {
    const middleware = async (ctx: C, next: Next): Promise<void> => {
      const validateResult = schema.validate(ctx.data);

      if (validateResult.errors) {
        ctx.throw({
          code: ErrorCode.VALIDATION_FAILED,
          message: JSON.stringify(validateResult.errors),
        });
        return;
      }

      const value = validateResult.value;
      ctx.validatedData = value;

      await next();
    };

    this._middlewares.push(middleware as any);
  }

  listen(listenCallback?: () => void): void {
    const callback = this._callback();

    this._kafka.listenCommand(callback);
    this._kafka.listenEvent(callback);

    listenCallback?.();
  }

  use(fn: Middleware): KoaKafka {
    this._middlewares.push(fn);
    return this;
  }

  handleCommand({
    version,
    command,
    schema,
    handler,
  }: {
    version: Version;
    command: Command;
    schema?: ObjectSchema;
    handler: Middleware<C>;
  }): KoaKafka {
    if (schema) {
      this._setValidateMiddleware(schema);
    }

    const middleware = async (ctx: C, next: Next): Promise<void> => {
      if (ctx.command === command && ctx.version === version) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware as any);

    this._kafka.handleCommand(command, version);
    return this;
  }

  handleEvent({ version, event, handler }: { version: Version; event: Event; handler: Middleware<C> }): KoaKafka {
    const middleware = async (ctx: C, next: Next): Promise<void> => {
      if (ctx.event === event && ctx.version === version) {
        return handler(ctx, next);
      }

      await next();
    };

    this._middlewares.push(middleware as any);
    this._kafka.handleEvent(event, version);
    return this;
  }
}
