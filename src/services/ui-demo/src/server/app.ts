import Koa from 'koa';
import cors from '@koa/cors';
import Router from '@koa/router';

import { config } from 'lib/config';

import { configMiddleware, prepareAssetsMiddleware, indexPageMiddleware } from './middlewares';
import { apiRouter } from './routes';

const router = new Router();
const app = new Koa();

router.use(config.apiPath, apiRouter.routes()).get(/^((?!\.).)*$/, indexPageMiddleware);

export async function initApp(): Promise<Koa> {
  const assetsMiddleware = await prepareAssetsMiddleware();

  app
    .use(configMiddleware)
    .use(assetsMiddleware)
    .use(
      cors({
        allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        credentials: true,
        maxAge: 2592000, // 1 month
      }),
    )
    .use(router.routes());

  return app;
}
