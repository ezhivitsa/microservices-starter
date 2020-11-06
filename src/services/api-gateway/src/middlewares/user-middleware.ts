import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';

export const userMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
  await next();
};
