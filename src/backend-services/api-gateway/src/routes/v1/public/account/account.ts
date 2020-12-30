import { RouterAppContext } from 'koa';
import { Request, Response } from 'oauth2-server';

import { client, CLIENT_SECRET } from 'lib/oauth';

import { AccountService } from 'services';

import { SignUpRequest, SignInRequest } from './types';

export async function signUp(ctx: RouterAppContext): Promise<void> {
  const data: SignUpRequest = ctx.state.validatedRequest.value;

  await AccountService.register(
    {
      ...data,
      owner: true,
    },
    ctx.state,
  );

  ctx.body = null;
}

export async function signIn(ctx: RouterAppContext): Promise<void> {
  const data: SignInRequest = ctx.state.validatedRequest.value;

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
  // ToDo: set tokens to cookies
  ctx.body = res.body;
}
