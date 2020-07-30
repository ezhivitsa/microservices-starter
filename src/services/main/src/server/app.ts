import Koa, {AppKoaState, AppKoaContext} from 'koa';
import mount from 'koa-mount';
import helmet from 'koa-helmet';

import {configMiddleware} from './middlewares/config-middleware';
import {pingMiddleware} from './middlewares/ping-middleware';
import {startTimeMiddleware} from './middlewares/start-time-middleware';
import {prepareAssetsMiddleware} from './middlewares/assets-middleware';

const assetsMiddleware = await prepareAssetsMiddleware();

export const app = new Koa<AppKoaState, AppKoaContext>()
  .use(configMiddleware)
  .use(mount('/ping', pingMiddleware))
  .use(startTimeMiddleware)
  .use(helmet())
  .use(assetsMiddleware);
