import Koa, { AppKoaState, AppKoaContext } from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import Router from '@koa/router';

import { middlewares } from '@packages/server';

import { config } from './lib/config';

import {
  configMiddleware,
  prepareAssetsMiddleware,
  errorsMiddleware,
  featureFlagsMiddleware,
  indexPageMiddleware,
} from './middlewares';

const router = new Router();
const app = new Koa<AppKoaState, AppKoaContext>();

router.get(/^((?!\.).)*$/, indexPageMiddleware);

export async function initApp(): Promise<Koa<AppKoaState, AppKoaContext>> {
  const assetsMiddlewares = await prepareAssetsMiddleware();
  const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  app
    .use(configMiddleware)
    .use(errorsMiddleware)
    .use(mount('/ping', middlewares.pingMiddleware))
    .use(middlewares.startTimeMiddleware)
    .use(helmet())
    .use(
      cors({
        allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        allowHeaders: config.requestIdHeader,
        credentials: true,
        maxAge: 2592000, // 1 month
      }),
    )
    .use(assetsMiddlewares)
    .use(loggerInitMiddleware)
    .use(middlewares.logRequestMiddleware)
    .use(featureFlagsMiddleware)
    .use(router.routes());

  return app;
}
