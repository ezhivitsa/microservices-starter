import Koa, {AppKoaState, AppKoaContext} from 'koa';
import mount from 'koa-mount';

import {configMiddleware} from './middlewares/config-middleware';
import {pingMiddleware} from './middlewares/ping-middleware';

export const app = new Koa<AppKoaState, AppKoaContext>()
  .use(configMiddleware)
  .use(mount('/ping', pingMiddleware));
