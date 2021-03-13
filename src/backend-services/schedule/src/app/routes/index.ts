import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { ScheduleTypes } from '@packages/communication';

import { logger } from '@root/lib/logger';

import { initV1Routes } from './v1';

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      const errorCode = ScheduleTypes.ErrorCode.Unknown;
      const message: string | undefined = err.message;

      const error: ScheduleTypes.Error = {
        code: errorCode,
        message,
      };

      logger.error({ ...error });
      ctx.throw(error);
    }
  });

  initV1Routes(app);
}
