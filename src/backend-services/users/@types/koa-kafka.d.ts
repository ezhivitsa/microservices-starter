import { Logger } from 'winston';
import { Middleware, Context } from '@packages/koa-kafka';

declare module '@packages/koa-kafka' {
  export interface AppState {
    startTime: number;
    logger: Logger;
  }

  export type AppContext = Context<AppState>;

  export type AppMiddleware = Middleware<AppContext>;
}
