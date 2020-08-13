import { AppMiddleware, AppContext, Next } from 'koa';

export const startTimeMiddleware: AppMiddleware = (ctx: AppContext, next: Next): void => {
  ctx.state.startTime = Date.now();

  next();
};
