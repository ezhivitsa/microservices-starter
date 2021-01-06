import { RouterAppMiddleware, RouterAppContext, Next, User } from 'koa';
import { Request, Response } from 'oauth2-server';

export const authMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
  const req = new Request({
    body: {
      grant_type: 'refresh_token',
    },
    headers: {
      ...ctx.headers,
      Authorization: `Bearer ${ctx.state.token || ''}`,
    },
    method: ctx.method,
    query: ctx.query,
  });
  const res = new Response(ctx.response);

  const token = await ctx.oauth.authenticate(req, res);
  ctx.state.user = token.user as User;

  await next();
};
