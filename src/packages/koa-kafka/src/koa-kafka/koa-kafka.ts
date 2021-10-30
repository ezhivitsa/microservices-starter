import { ObjectSchema } from 'joi';
import { Kafka, Command, Event, Version, Channel } from '@packages/communication';

import { compose } from './utils';
import { Context } from './context';

import { Middleware, ComposedMiddleware, Next, ListenData, RequestStatus, UniqModel } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Options {
  badProtoCode: number;
  validationFailedCode: number;
  uniqModel?: UniqModel;
}

export class KoaKafka<S extends Record<string, any> = Record<string, any>, C extends Context = Context> {
  private _middlewares: Middleware[] = [];

  constructor(private _kafka: Kafka, private _channel: Channel, private _options: Options) {}

  private _respond(ctx: Context<S>): void {
    const { body } = ctx;

    if (!ctx.command) {
      return;
    }

    this._kafka.sendReply(
      {
        data: body || null,
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
    ctx.end(RequestStatus.Ok);
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

  private _validateCommand(ctx: C, schema: ObjectSchema): boolean {
    const validateResult = schema.validate(ctx.data, {
      allowUnknown: true,
    });

    if (validateResult.error) {
      ctx.throw({
        code: this._options.validationFailedCode,
        message: JSON.stringify(validateResult.error),
      });
      return false;
    }

    const value = validateResult.value;
    ctx.validatedData = value;

    return true;
  }

  listen(listenCallback?: () => void): void {
    const callback = this._callback();

    this._kafka.listenCommand(callback);
    this._kafka.listenEvent(callback);

    listenCallback?.();
  }

  use(fn: Middleware<C>): KoaKafka<S, C> {
    this._middlewares.push(fn as any);
    return this;
  }

  handleCommand({
    version,
    command,
    schema,
    handler,
    validateUniq,
  }: {
    version: Version;
    command: Command;
    schema?: ObjectSchema;
    handler: Middleware<C>;
    validateUniq?: boolean;
  }): KoaKafka<S, C> {
    const middleware = async (ctx: C, next: Next): Promise<void> => {
      if (ctx.command !== command || ctx.version !== version) {
        await next();
        return;
      }

      const { uniqModel } = this._options;
      if (uniqModel && validateUniq) {
        const isUniq = await uniqModel.isUniqId(ctx.id);
        if (!isUniq) {
          ctx.throw({
            code: uniqModel.conflictCode,
          });
          return;
        }

        uniqModel.saveId(ctx.id);
      }

      if (schema) {
        const valid = this._validateCommand(ctx, schema);
        if (!valid) {
          return;
        }
      }

      return handler(ctx, next);
    };

    this._middlewares.push(middleware as any);

    this._kafka.handleCommand(this._channel, command, version);
    return this;
  }

  handleEvent({
    version,
    event,
    channel,
    handler,
  }: {
    version: Version;
    event: Event;
    channel: Channel;
    handler: Middleware<C>;
  }): KoaKafka<S, C> {
    const middleware = async (ctx: C, next: Next): Promise<void> => {
      if (ctx.event !== event || ctx.version !== version) {
        await next();
        return;
      }

      const { uniqModel } = this._options;
      if (uniqModel) {
        const isUniq = await uniqModel.isUniqId(ctx.id);
        if (!isUniq) {
          return;
        }

        uniqModel.saveId(ctx.id);
      }

      return handler(ctx, next);
    };

    this._middlewares.push(middleware as any);
    this._kafka.handleEvent(channel, event, version);
    return this;
  }
}
