import { RouterAppContext } from 'koa';
import { Request, Response } from 'oauth2-server';

import { ServiceTypes } from '@packages/common';

import { client, CLIENT_SECRET } from 'lib/oauth';
import { setTokens } from 'lib/tokens';

export async function signInHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.SignInRequest = ctx.state.validatedRequest.value;

  const req = new Request({
    body: {
      username: data.email,
      password: data.password,
      grant_type: 'password',
      client_id: client.id,
      client_secret: CLIENT_SECRET,
    },
    headers: {
      ...ctx.headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: ctx.method,
    query: ctx.query,
  });
  const res = new Response(ctx.response);

  await ctx.oauth.token(req, res);

  if (res.headers) {
    ctx.set(res.headers);
  }

  if (res.body) {
    setTokens(ctx, res.body);
  }
  ctx.body = null;
}
