import { AppMiddleware, AppContext, Next } from 'koa';

export const authMiddleware: AppMiddleware = async (ctx: AppContext, next: Next): Promise<void> => {
  await next();
};
