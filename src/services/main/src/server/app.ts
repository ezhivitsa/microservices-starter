import Koa, {AppKoaState, AppKoaContext} from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

import {config} from './lib/config';

import {
  configMiddleware,
  pingMiddleware,
  startTimeMiddleware,
  prepareAssetsMiddleware,
  errorsMiddleware
} from './middlewares';

const assetsMiddleware = await prepareAssetsMiddleware();

export const app = new Koa<AppKoaState, AppKoaContext>()
  .use(configMiddleware)
  .use(errorsMiddleware)
  .use(mount('/ping', pingMiddleware))
  .use(startTimeMiddleware)
  .use(helmet())
  .use(assetsMiddleware)
  .use(cors({
    allowMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowHeaders: config.requestIdHeader,
    credentials: true,
    maxAge: 2592000 // 1 month  
  }));
  