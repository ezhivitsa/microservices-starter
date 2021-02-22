import { AppMiddleware, AppContext, Next } from 'koa';

import { config } from 'lib/config';

export const configMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  ctx.state.config = config;

  await next();
};
