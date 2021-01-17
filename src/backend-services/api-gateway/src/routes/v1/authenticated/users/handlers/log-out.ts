import { RouterAppContext } from 'koa';

import { ACCESS_TOKEN, EXPIRED_AT, REFRESH_TOKEN } from 'constants/cookie-constants';

import { AccountService } from 'services';

export async function logOutHandler(ctx: RouterAppContext): Promise<void> {
  const { token, refreshToken, user } = ctx.state;

  if (!refreshToken || !user) {
    return;
  }

  await AccountService.revokeToken(
    {
      accessToken: token,
      refreshToken,
      user,
    },
    ctx.state,
  );

  ctx.set(ACCESS_TOKEN, '');
  ctx.set(EXPIRED_AT, '');
  ctx.set(REFRESH_TOKEN, '');

  ctx.body = null;
}
