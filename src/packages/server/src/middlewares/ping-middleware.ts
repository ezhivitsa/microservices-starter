import { Middleware, Context } from 'koa';

export const pingMiddleware: Middleware = (ctx: Context): void => {
  ctx.status = 204;
};
