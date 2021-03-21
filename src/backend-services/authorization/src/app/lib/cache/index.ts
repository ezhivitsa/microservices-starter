import { getRedis } from '@packages/redis-storage';

import { initAccessToken, initRefreshToken } from './models';
import { config } from './config';

const redis = getRedis(config);

export const cache = {
  redis,
  AccessToken: initAccessToken(redis),
  RefreshToken: initRefreshToken(redis),
};
