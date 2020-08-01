import { AppMiddleware, AppContext, Next } from 'koa';

import { logger } from '../lib/logger';

export const errorsMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    logger.error(err);
    ctx.status = err.status || 500;
  }
};
