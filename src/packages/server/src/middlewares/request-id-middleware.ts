import { AppMiddleware, AppContext, Next } from 'koa';
import uuid from 'uuid/v1';

export const requestIdMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  ctx.state.requestId = uuid();

  await next();
};
