import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { logger } from 'lib/logger';

import { initV1Routes } from './v1';

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      const errorCode = UserTypes.ErrorCode.Unknown;
      const message: string | undefined = err.message;

      logger.error(err);

      const error: UserTypes.Error = {
        code: errorCode,
        message,
      };
      ctx.throw(error);
    }
  });

  initV1Routes(app);
}
