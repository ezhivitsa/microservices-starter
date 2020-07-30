import {
  Middleware,
  ParameterizedContext
} from 'koa';

import {Config} from '../server/configs/types';

declare module 'koa' {
    export interface AppKoaState {
        config: Config;
        startTime: number;
    }

    export interface AppKoaContext {}

    export type AppMiddleware = BaseMiddleware<AppKoaState, AppKoaContext>;

    export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;
}
