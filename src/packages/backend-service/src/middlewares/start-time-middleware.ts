import { AppMiddleware, AppContext, Next } from '@packages/koa-kafka';

export const startTimeMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  ctx.state.startTime = Date.now();

  await next();
};
