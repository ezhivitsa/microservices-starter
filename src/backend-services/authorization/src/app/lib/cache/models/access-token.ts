import { Cache, Redis } from '@packages/redis-storage';

import { AUTH_PREFIX, ACCESS_TOKEN_PREFIX } from '@root/constants/app-constants';

export function initAccessToken(redis: Redis): Cache {
  return redis.define([AUTH_PREFIX, ACCESS_TOKEN_PREFIX]);
}
