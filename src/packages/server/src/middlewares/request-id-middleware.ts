import { AppMiddleware, AppContext, Next } from 'koa';
import { v1 as uuid } from 'uuid';

export const requestIdMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  ctx.state.requestId = uuid();

  await next();
};
