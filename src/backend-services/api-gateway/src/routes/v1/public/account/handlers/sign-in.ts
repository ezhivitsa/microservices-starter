import { RouterAppContext, User } from 'koa';
import { Request, Response, Token, InvalidGrantError } from 'oauth2-server';

import { ServiceTypes, Errors } from '@packages/common';

import { client, CLIENT_SECRET } from 'lib/oauth';
import { setTokens } from 'lib/tokens';

import { ApiError } from 'errors';

function validateUser(user: User, timeForVerifyEmail: number): void {
  const endVerifyPeriod = user.registeredAt.getTime() + timeForVerifyEmail;
  if (!user.isEmailVerified && endVerifyPeriod < Date.now()) {
    throw new ApiError(Errors.AuthorizationErrorType.EmailNotVerified);
  }
}

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

  let token: Token;
  try {
    token = await ctx.oauth.token(req, res);
  } catch (err) {
    if (err instanceof InvalidGrantError) {
      throw new ApiError(Errors.AuthorizationErrorType.InvalidCredentials);
    }
    throw err;
  }

  if (res.headers) {
    ctx.set(res.headers);
  }

  if (res.body) {
    setTokens(ctx, res.body);
  }

  validateUser(token.user as User, ctx.state.config.timeForVerifyEmail);
  ctx.body = null;
}
