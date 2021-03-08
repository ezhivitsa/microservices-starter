import redis, { Callback } from 'redis';
import { promisify } from 'util';

import { redisConfig } from './config';

export const redisClient = redis.createClient(redisConfig);

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const setexAsync = promisify(redisClient.setex).bind(redisClient);
const delAsync = promisify(redisClient.del as (arg1: string | string[], cb?: Callback<number>) => boolean).bind(
  redisClient,
);

export class Cache {
  constructor(private _prefixes: string[] = [], private _defaultExpire?: number) {}

  private _prefixKey(key: string): string {
    if (this._prefixes) {
      return [...this._prefixes, key].join(':');
    }
    return key;
  }

  get(key: string): Promise<string | null> {
    return getAsync(this._prefixKey(key));
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    const keyExpire = expire || this._defaultExpire;
    if (keyExpire) {
      await setexAsync(this._prefixKey(key), keyExpire, value);
      return;
    }

    await setAsync(this._prefixKey(key), value);
  }

  async has(key: string): Promise<boolean> {
    const result = await this.get(key);
    return result !== null;
  }

  delete(key: string): Promise<number> {
    return delAsync(this._prefixKey(key));
  }
}
