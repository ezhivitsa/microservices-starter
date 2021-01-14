import { RouterAppMiddleware, RouterAppContext, Next, User } from 'koa';
import { Request, Response, Token } from 'oauth2-server';

import { client, CLIENT_SECRET } from 'lib/oauth';
import { setTokens } from 'lib/tokens';

async function tryRefreshToken(ctx: RouterAppContext, refreshToken: string): Promise<Token> {
  const req = new Request({
    body: {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      client_id: client.id,
      client_secret: CLIENT_SECRET,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': 1,
    },
    method: 'POST',
    query: ctx.query,
  });
  const res = new Response(ctx.response);

  const token = await ctx.oauth.token(req, res);
  if (res.body) {
    setTokens(ctx, res.body);
  }

  return token;
}

async function getToken(ctx: RouterAppContext, accessToken?: string, refreshToken?: string): Promise<Token> {
  if (!accessToken && refreshToken) {
    return tryRefreshToken(ctx, refreshToken);
  }

  const req = new Request({
    body: {
      grant_type: 'refresh_token',
    },
    headers: {
      ...ctx.headers,
      Authorization: `Bearer ${accessToken || ''}`,
    },
    method: ctx.method,
    query: ctx.query,
  });
  const res = new Response(ctx.response);

  try {
    const token = await ctx.oauth.authenticate(req, res);
    return token;
  } catch (err) {
    if (refreshToken) {
      return tryRefreshToken(ctx, refreshToken);
    }
    throw err;
  }
}

export const authMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext, next: Next): Promise<void> => {
  try {
    const token = await getToken(ctx, ctx.state.token, ctx.state.refreshToken);
    ctx.state.user = token.user as User;

    await next();
  } catch (err) {
    ctx.throw(401);
  }
};
