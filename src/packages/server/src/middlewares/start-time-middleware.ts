import { AppMiddleware, AppContext, Next } from 'koa';

export const startTimeMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  ctx.state.startTime = Date.now();

  await next();
};
