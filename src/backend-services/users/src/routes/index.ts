import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { ErrorCode } from '@packages/communication';

import { ValidationError } from 'services/errors';

import { initV1Routes } from './v1';

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  initV1Routes(app);

  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      let errorCode = ErrorCode.UNKNOWN;
      let message: Record<string, any> | undefined;

      if (err instanceof ValidationError) {
        errorCode = ErrorCode.VALIDATION_FAILED;
        message = err.errorData;
      }

      ctx.throw({
        code: errorCode,
        message: message ? JSON.stringify(message) : undefined,
      });
    }
  });
}
