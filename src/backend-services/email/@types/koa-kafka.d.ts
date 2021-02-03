import { Logger } from 'winston';
import { Middleware, Context } from '@packages/koa-kafka';

import { Config } from '../src/configs/types';

declare module '@packages/koa-kafka' {
  export interface AppState {
    config: Config;
    startTime: number;
    logger: Logger;
  }

  export type AppContext = Context<AppState>;

  export type AppMiddleware = Middleware<AppContext>;
}
