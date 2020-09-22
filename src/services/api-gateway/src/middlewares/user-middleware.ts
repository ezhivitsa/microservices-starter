import { AppMiddleware, AppContext, Next } from 'koa';

export const userMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  await next();
};
