import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { logger } from '@root/lib/logger';

import { ServiceError, ServiceErrorCode } from '@root/services/errors';

import { initV1Routes } from './v1';

const mapErrorCode: Record<ServiceErrorCode, UserTypes.ErrorCode> = {
  [ServiceErrorCode.Unknown]: UserTypes.ErrorCode.Unknown,
  [ServiceErrorCode.NotFound]: UserTypes.ErrorCode.NotFound,
  [ServiceErrorCode.DuplicateAuthId]: UserTypes.ErrorCode.DuplicateAuthId,
};

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      let errorCode = UserTypes.ErrorCode.Unknown;
      let message: string | undefined;

      if (err instanceof ServiceError) {
        errorCode = mapErrorCode[err.errorCode];
        message = err.message;
      }

      const error: UserTypes.Error = {
        code: errorCode,
        message,
      };

      if (ctx.state.config.logServiceErrors || !(err instanceof ServiceError)) {
        logger.error(error);
      }

      ctx.throw(error);
    }
  });

  initV1Routes(app);
}
