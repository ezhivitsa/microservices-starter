import { KoaKafka, AppKoaState } from '@packages/koa-kafka';
import mount from 'koa-mount';

import { middlewares } from '@packages/server';

import { config } from './lib/config';
import { kafka } from './lib/kafka';

// import { configMiddleware, errorsMiddleware } from './middlewares';

const app = new KoaKafka<AppKoaState>(kafka);

export function initApp(): KoaKafka<AppKoaState> {
  // const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  // app
  // .use(configMiddleware)
  // .use(errorsMiddleware)
  // .use(mount('/ping', middlewares.pingMiddleware))
  // .use(middlewares.requestIdMiddleware)
  // .use(middlewares.startTimeMiddleware)
  // .use(loggerInitMiddleware)
  // .use(middlewares.logRequestMiddleware);

  return app;
}
