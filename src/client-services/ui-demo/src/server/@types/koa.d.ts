import { Middleware, ParameterizedContext } from 'koa';
import { Middleware as RouterMiddleware, RouterContext } from '@koa/router';

import { Config } from '../configs/types';

declare module 'koa' {
  export interface AppKoaState {
    config: Config;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AppKoaContext {}

  export type AppMiddleware = Middleware<AppKoaState, AppKoaContext>;

  export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;

  export type RouterAppMiddleware = RouterMiddleware<AppKoaState, AppKoaContext>;

  export type RouterAppContext = RouterContext<AppKoaState>;
}
