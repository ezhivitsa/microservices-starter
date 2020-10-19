import { Middleware, ParameterizedContext } from 'koa';
import { RouterContext, Middleware as RouterMiddleware } from '@koa/router';
import { Logger } from 'winston';

import { Config } from '../src/configs/types';

import { ValidateResult } from '../src/lib/joi';

declare module 'koa' {
  export interface AppKoaState {
    config: Config;
    startTime: number;
    logger: Logger;
    validatedRequest: ValidateResult<any>;
    requestId: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AppKoaContext {}

  export type AppMiddleware = Middleware<AppKoaState, AppKoaContext>;

  export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;

  export type RouterAppMiddleware = RouterMiddleware<AppKoaState, AppKoaContext>;

  export type RouterAppContext = RouterContext<AppKoaState, AppKoaContext>;
}
