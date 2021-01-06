import { RouterAppMiddleware, RouterAppContext, Next } from 'koa';

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/cookie-constants';

export const tokensMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
  const accessToken = ctx.cookies.get(ACCESS_TOKEN);
  const refreshToken = ctx.cookies.get(REFRESH_TOKEN);

  ctx.state.token = accessToken;
  ctx.state.refreshToken = refreshToken;

  await next();
};
