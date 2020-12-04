import { Middleware, Context, Next } from 'koa';

import { config } from 'lib/config';

export const configMiddleware: Middleware = async (ctx: Context, next: Next): Promise<void> => {
  ctx.state.config = config;

  await next();
};
