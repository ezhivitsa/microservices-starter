import { RouterAppContext } from 'koa';

import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRED_AT } from 'constants/cookie-constants';

import { config } from 'lib/config';

interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export function setTokens(ctx: RouterAppContext, data: TokenData): void {
  const expiredAt = new Date(Date.now() + data.expires_in * 1000);
  const refreshTokenExpiredAt = new Date(Date.now() + config.tokens.refreshTokenLifetime * 1000);

  const cookieOpts = {
    httpOnly: true,
    domain: config.domain,
  };

  ctx.cookies.set(ACCESS_TOKEN, data.access_token, {
    ...cookieOpts,
    expires: expiredAt,
  });
  ctx.cookies.set(REFRESH_TOKEN, data.refresh_token, {
    ...cookieOpts,
    expires: refreshTokenExpiredAt,
  });
  ctx.cookies.set(EXPIRED_AT, expiredAt.toISOString(), {
    ...cookieOpts,
    expires: expiredAt,
  });
}
