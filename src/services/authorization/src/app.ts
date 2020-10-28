import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';
import mount from 'koa-mount';

import { middlewares } from '@packages/server';

import { config } from './lib/config';
import { kafka } from './lib/kafka';

import { initRoutes } from './routes';

// import { configMiddleware, errorsMiddleware } from './middlewares';

const app = new KoaKafka<AppState, AppContext>(kafka);

export function initApp(): KoaKafka<AppState, AppContext> {
  // const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  // app
  // .use(configMiddleware)
  // .use(errorsMiddleware)
  // .use(mount('/ping', middlewares.pingMiddleware))
  // .use(middlewares.requestIdMiddleware)
  // .use(middlewares.startTimeMiddleware)
  // .use(loggerInitMiddleware)
  // .use(middlewares.logRequestMiddleware);

  initRoutes(app);

  return app;
}
