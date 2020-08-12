import Koa, { AppKoaState, AppKoaContext } from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import Router from '@koa/router';

import { config } from './lib/config';

import {
  configMiddleware,
  pingMiddleware,
  startTimeMiddleware,
  prepareAssetsMiddleware,
  errorsMiddleware,
  loggerInitMiddleware,
  logRequestMiddleware,
  featureFlagsMiddleware,
  indexPageMiddleware,
} from './middlewares';

const router = new Router();
const app = new Koa<AppKoaState, AppKoaContext>();

router.get(/^((?!\.).)*$/, indexPageMiddleware);

export async function initApp(): Promise<Koa<AppKoaState, AppKoaContext>> {
  const assetsMiddlewares = await prepareAssetsMiddleware();

  app
    .use(configMiddleware)
    .use(errorsMiddleware)
    .use(mount('/ping', pingMiddleware))
    .use(startTimeMiddleware)
    .use(helmet());

  [assetsMiddlewares].forEach((middleware) => {
    app.use(middleware);
  });

  app
    .use(loggerInitMiddleware)
    .use(logRequestMiddleware)
    .use(
      cors({
        allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        allowHeaders: config.requestIdHeader,
        credentials: true,
        maxAge: 2592000, // 1 month
      }),
    )
    .use(featureFlagsMiddleware)
    .use(router.routes());

  return app;
}
