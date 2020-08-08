import { AppMiddleware, AppContext, Next } from 'koa';

import { logger } from 'lib/logger';

export const loggerInitMiddleware: AppMiddleware = (ctx: AppContext, next: Next): void => {
  ctx.state.logger = logger.child({
    hostname: ctx.hostname,
  });

  next();
};
