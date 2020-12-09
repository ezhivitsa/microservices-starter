import Koa, { AppKoaState, AppKoaContext } from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { middlewares } from '@packages/server';

import { config } from './lib/config';
import { oauth } from './lib/oauth';

import { configMiddleware, errorsMiddleware } from './middlewares';
import { apiRouter } from './routes';

const app = new Koa<AppKoaState, AppKoaContext>();

export function initApp(): Koa<AppKoaState, AppKoaContext> {
  const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  app.context.oauth = oauth;

  app
    .use(configMiddleware)
    .use(errorsMiddleware)
    .use(mount('/ping', middlewares.pingMiddleware))
    .use(middlewares.requestIdMiddleware)
    .use(middlewares.startTimeMiddleware)
    .use(helmet())
    .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
    .use(loggerInitMiddleware)
    .use(middlewares.logRequestMiddleware)
    .use(
      cors({
        allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        credentials: true,
        maxAge: 2592000, // 1 month
      }),
    )
    .use(mount('/api', apiRouter.routes()));

  return app;
}
