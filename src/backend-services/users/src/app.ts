import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';

import { kafka } from './lib/kafka';

import { initRoutes } from './routes';

const app = new KoaKafka<AppState, AppContext>(kafka);

export function initApp(): KoaKafka<AppState, AppContext> {
  initRoutes(app);

  return app;
}
