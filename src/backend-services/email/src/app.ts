import { KoaKafka, AppState, AppContext } from '@packages/koa-kafka';
import { UserTypes, Channel } from '@packages/communication';
import { middlewares } from '@packages/backend-service';

import { kafka } from './lib/kafka';
import { config } from './lib/config';

import { initRoutes } from './routes';

const app = new KoaKafka<AppState, AppContext>(kafka, Channel.Email, {
  badProtoCode: UserTypes.ErrorCode.BadProto,
  validationFailedCode: UserTypes.ErrorCode.ValidationFailed,
});

export function initApp(): KoaKafka<AppState, AppContext> {
  const loggerInitMiddleware = middlewares.prepareLoggerInitMiddleware(config.logger);

  app.use(middlewares.startTimeMiddleware).use(loggerInitMiddleware).use(middlewares.logRequestMiddleware);

  initRoutes(app);

  return app;
}
