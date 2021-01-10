import { ObjectSchema } from 'joi';
import { Kafka, Command, Event, Version, Channel } from '@packages/communication';

import { compose } from './utils';
import { Context } from './context';

import { Middleware, ComposedMiddleware, Next, ListenData } from './types';

interface Options {
  badProtoCode: number;
  validationFailedCode: number;
}

export class KoaKafka<S extends Record<string, any> = Record<string, any>, C extends Context = Context> {
  private _middlewares: Middleware[] = [];

  constructor(private _kafka: Kafka, private _channel: Channel, private _options: Options) {}

  private _respond(ctx: Context<S>): void {
    const { body } = ctx;

    if (body === undefined || !ctx.command) {
      return;
    }

    this._kafka.sendReply(
      {
        data: body,
        channel: this._channel,
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
      const ctx = new Context<S>(this._kafka, this._channel, data);

      if (ctx.dataError) {
        ctx.throw({
          code: this._options.badProtoCode,
        });
        return;
      }

      return this._handleRequest(ctx, fn);
    };
  }

  private _setValidateMiddleware(schema: ObjectSchema): void {
    const middleware = async (ctx: C, next: Next): Promise<void> => {
      const validateResult = schema.validate(ctx.data, {
        allowUnknown: true,
      });

      if (validateResult.errors) {
        ctx.throw({
          code: this._options.validationFailedCode,
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

  use(fn: Middleware<C>): KoaKafka {
    this._middlewares.push(fn as any);
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

    this._kafka.handleCommand(this._channel, command, version);
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
    this._kafka.handleEvent(this._channel, event, version);
    return this;
  }
}
