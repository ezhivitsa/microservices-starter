import { RouterAppContext } from 'koa';
import { Request, Response } from 'oauth2-server';

import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRED_AT } from 'constants/cookie-constants';

import { client, CLIENT_SECRET } from 'lib/oauth';
import { config } from 'lib/config';

import { AccountService } from 'services';

import { SignUpRequest, SignInRequest } from './types';

interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

function setTokens(ctx: RouterAppContext, data: TokenData): void {
  const expiredAt = new Date(Date.now() + data.expires_in);
  const refreshTokenExpiredAt = new Date(Date.now() + config.tokens.refreshTokenLifetime);

  ctx.cookies.set(ACCESS_TOKEN, data.access_token, {
    httpOnly: true,
    expires: expiredAt,
    domain: config.domain,
  });
  ctx.cookies.set(REFRESH_TOKEN, data.refresh_token, {
    httpOnly: true,
    expires: refreshTokenExpiredAt,
    domain: config.domain,
  });
  ctx.cookies.set(EXPIRED_AT, expiredAt.toISOString(), {
    httpOnly: false,
    domain: config.domain,
  });
}

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

  if (res.body) {
    setTokens(ctx, res.body);
  }
  ctx.body = null;
}
