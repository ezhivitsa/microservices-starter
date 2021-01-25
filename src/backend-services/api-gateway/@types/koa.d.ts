import { Middleware, ParameterizedContext } from 'koa';
import { RouterContext, Middleware as RouterMiddleware } from '@koa/router';
import { Logger } from 'winston';
import OAuth2Server from 'oauth2-server';
import { Version } from '@packages/communication';

import { Config } from '../src/configs/types';

import { ValidateResult } from '../src/lib/joi';

import { AuthProviderTypes } from '../src/providers';

declare module 'koa' {
  interface User {
    id: string;
    email: string;
    roles: AuthProviderTypes.UserRole[];
    isEmailVerified: boolean;
    registeredAt: Date;
  }

  export interface AppKoaState {
    config: Config;
    startTime: number;
    logger: Logger;
    validatedRequest: ValidateResult<any>;
    requestId: string;
    version: Version;
    responseChannel: string;
    token?: string;
    refreshToken?: string;
    user: User;
    refreshTokenExpiresAt?: Date;
  }

  export interface AppKoaContext {
    oauth: OAuth2Server;
  }

  export type AppMiddleware = Middleware<AppKoaState, AppKoaContext>;

  export type AppContext = ParameterizedContext<AppKoaState, AppKoaContext>;

  export type RouterAppMiddleware = RouterMiddleware<AppKoaState, AppKoaContext>;

  export type RouterAppContext = RouterContext<AppKoaState, AppKoaContext>;
}
