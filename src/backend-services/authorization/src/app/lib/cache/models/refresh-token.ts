import { Cache, Redis } from '@packages/redis-storage';

import { AUTH_PREFIX, REFRESH_TOKEN_PREFIX } from '@root/constants/app-constants';

export function initRefreshToken(redis: Redis): Cache {
  return redis.define([AUTH_PREFIX, REFRESH_TOKEN_PREFIX]);
}
