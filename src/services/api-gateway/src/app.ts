import Koa, { AppKoaState, AppKoaContext } from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import Router from '@koa/router';

import { middlewares } from '@packages/server';

import { config } from './lib/config';

import { configMiddleware, errorsMiddleware } from './middlewares';
import { router } from './routes';

const router = new Router();
const app = new Koa<AppKoaState, AppKoaContext>();

export function initApp(): Koa<AppKoaState, AppKoaContext> {
  const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  app
    .use(configMiddleware)
    .use(errorsMiddleware)
    .use(mount('/ping', middlewares.pingMiddleware))
    .use(middlewares.startTimeMiddleware)
    .use(helmet())
    .use(loggerInitMiddleware)
    .use(middlewares.logRequestMiddleware)
    .use(
      cors({
        allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        allowHeaders: config.requestIdHeader,
        credentials: true,
        maxAge: 2592000, // 1 month
      }),
    )
    .use(mount('/api', router.routes()));

  return app;
}
