import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';

export const authMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
  await next();
};
