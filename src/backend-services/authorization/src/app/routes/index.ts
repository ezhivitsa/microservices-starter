import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { logger } from '@root/lib/logger';

import { ServiceError, ServiceErrorCode } from '@root/services/errors';

import { initV1Routes } from './v1';

const mapErrorCode: Record<ServiceErrorCode, AuthorizationTypes.ErrorCode> = {
  [ServiceErrorCode.Unknown]: AuthorizationTypes.ErrorCode.Unknown,
  [ServiceErrorCode.NotFound]: AuthorizationTypes.ErrorCode.NotFound,
  [ServiceErrorCode.DuplicateEmail]: AuthorizationTypes.ErrorCode.DuplicateEmail,
};

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      let errorCode = AuthorizationTypes.ErrorCode.Unknown;
      let message: string | undefined;

      if (err instanceof ServiceError) {
        errorCode = mapErrorCode[err.errorCode];
        message = err.message;
      }

      const error: AuthorizationTypes.Error = {
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
