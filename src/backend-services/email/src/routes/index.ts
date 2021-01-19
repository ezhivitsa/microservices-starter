import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { initV1Routes } from './v1';

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  initV1Routes(app);

  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      const errorCode = UserTypes.ErrorCode.Unknown;
      const message: string | undefined = err.message;

      const error: UserTypes.Error = {
        code: errorCode,
        message,
      };
      ctx.throw(error);
    }
  });
}
