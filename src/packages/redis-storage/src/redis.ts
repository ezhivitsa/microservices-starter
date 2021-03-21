import redis, { RedisClient } from 'redis';

import { Cache } from './cache';
import { Config, CacheOptions } from './types';

export class Redis {
  private _redisClient: RedisClient;

  constructor(config: Config) {
    this._redisClient = redis.createClient(config);
  }

  define(prefixes: string[] = [], cacheOptions: CacheOptions = {}): Cache {
    return new Cache(this._redisClient, prefixes, cacheOptions);
  }

  quit(): boolean {
    return this._redisClient.quit();
  }
}

export function getRedis(config: Config): Redis {
  return new Redis(config);
}
