import { AppMiddleware, AppContext, Next } from 'koa';
import { ValidationErrorItem } from 'joi';

import { Errors } from '@packages/common';

import { ApiError } from 'errors';

export const errorsMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ApiError) {
      const data: Errors.ErrorData = {
        error: {
          type: err.type,
          message: err.message,
        },
      };

      ctx.body = data;
      ctx.status = 400;
      return;
    } else if (err.isJoi) {
      const details: ValidationErrorItem[] = err.details;
      const data: Errors.ErrorData = {
        joiErrors: details,
      };

      ctx.body = data;
      ctx.status = 400;
      return;
    }

    ctx.status = err.status || 500;

    if (err.status >= 500 || ctx.state.config.logErrors400) {
      ctx.state.logger.error(err);
    }
  }
};
