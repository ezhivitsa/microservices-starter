import { AppMiddleware, AppContext, Next } from 'koa';

import { config } from '../lib/config';

export const configMiddleware: AppMiddleware = (ctx: AppContext, next: Next): void => {
  ctx.state.config = config;

  next();
};
