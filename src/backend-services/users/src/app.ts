import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { kafka } from './lib/kafka';

import { initRoutes } from './routes';

const app = new KoaKafka<AppState, AppContext>(kafka, {
  badProtoCode: UserTypes.ErrorCode.BadProto,
  validationFailedCode: UserTypes.ErrorCode.ValidationFailed,
});

export function initApp(): KoaKafka<AppState, AppContext> {
  initRoutes(app);

  return app;
}
