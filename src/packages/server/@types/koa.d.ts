import { Middleware, ParameterizedContext } from 'koa';
import { Logger } from 'winston';

declare module 'koa' {
  export interface AppKoaState {
    startTime: number;
    logger: Logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AppKoaContext {}

  export type AppMiddleware = Middleware<AppKoaState, AppKoaContext>;

  export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;
}
