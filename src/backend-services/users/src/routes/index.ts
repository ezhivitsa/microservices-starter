import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { UserTypes } from '@packages/communication';

import { logger } from 'lib/logger';

import { ServiceError, ServiceErrorCode } from 'services/errors';

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
      } else {
        logger.error(err);
      }

      const error: UserTypes.Error = {
        code: errorCode,
        message,
      };
      ctx.throw(error);
    }
  });

  initV1Routes(app);
}
