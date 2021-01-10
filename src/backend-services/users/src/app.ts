import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';
import { UserTypes, Channel } from '@packages/communication';

import { kafka } from './lib/kafka';

import { initRoutes } from './routes';

const app = new KoaKafka<AppState, AppContext>(kafka, Channel.USERS, {
  badProtoCode: UserTypes.ErrorCode.BadProto,
  validationFailedCode: UserTypes.ErrorCode.ValidationFailed,
});

export function initApp(): KoaKafka<AppState, AppContext> {
  initRoutes(app);

  return app;
}
