import { Middleware, ParameterizedContext } from 'koa';
import { Middleware as RouterMiddleware } from '@koa/router';
import { Logger } from 'winston';

import { Config } from '../configs/types';

import { FeatureFlag } from '../../common/feature-flags';

declare module 'koa' {
  export interface AppKoaState {
    config: Config;
    startTime: number;
    featureFlagsSet: Set<FeatureFlag>;
    logger: Logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AppKoaContext {}

  export type AppMiddleware = Middleware<AppKoaState, AppKoaContext>;

  export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;

  export type RouterAppMiddleware = RouterMiddleware<AppKoaState, AppKoaContext>;

  export type RouterAppContext = RouterContext<AppKoaState>;
}
