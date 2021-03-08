import { KoaKafka, AppState, AppContext, Next } from '@packages/koa-kafka';
import { AppointmentTypes } from '@packages/communication';

import { logger } from '@root/lib/logger';
import { config } from '@root/lib/config';

import { ServiceError, ServiceErrorCode } from '@root/services/errors';

import { initV1Routes } from './v1';

const mapErrorCode: Record<ServiceErrorCode, AppointmentTypes.ErrorCode> = {
  [ServiceErrorCode.Unknown]: AppointmentTypes.ErrorCode.Unknown,
  [ServiceErrorCode.NotFound]: AppointmentTypes.ErrorCode.NotFound,
  [ServiceErrorCode.AccessDenied]: AppointmentTypes.ErrorCode.AccessDenied,
};

export function initRoutes(app: KoaKafka<AppState, AppContext>): void {
  app.use(async (ctx: AppContext, next: Next) => {
    try {
      await next();
    } catch (err) {
      let errorCode = AppointmentTypes.ErrorCode.Unknown;
      let message: string | undefined;

      if (err instanceof ServiceError) {
        errorCode = mapErrorCode[err.errorCode];
        message = err.message;
      }

      const error: AppointmentTypes.Error = {
        code: errorCode,
        message,
      };

      if (config.logServiceErrors || !(err instanceof ServiceError)) {
        logger.error({ ...error });
      }

      ctx.throw(error);
    }
  });

  initV1Routes(app);
}
