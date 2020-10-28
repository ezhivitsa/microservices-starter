import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';

import { initV1Routes } from './v1';

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  initV1Routes(app);
}
