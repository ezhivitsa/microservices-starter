import { RedisClient, Callback } from 'redis';
import { promisify } from 'util';

import { CacheOptions } from './types';

export class Cache {
  private _getAsync: (key: string) => Promise<string | null>;
  private _setAsync: (key: string, value: string) => Promise<unknown>;
  private _setexAsync: (key: string, expire: number, value: string) => Promise<unknown>;
  private _delAsync: (keys: string | string[]) => Promise<number>;

  constructor(redisClient: RedisClient, private _prefixes: string[] = [], private _options: CacheOptions = {}) {
    this._getAsync = promisify(redisClient.get).bind(redisClient);
    this._setAsync = promisify(redisClient.set).bind(redisClient);
    this._setexAsync = promisify(redisClient.setex).bind(redisClient);
    this._delAsync = promisify(redisClient.del as (arg1: string | string[], cb?: Callback<number>) => boolean).bind(
      redisClient,
    );
  }

  private _prefixKey(key: string): string {
    if (this._prefixes) {
      return [...this._prefixes, key].join(':');
    }
    return key;
  }

  get(key: string): Promise<string | null> {
    return this._getAsync(this._prefixKey(key));
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    const keyExpire = expire || this._options.defaultExpire;
    if (keyExpire) {
      await this._setexAsync(this._prefixKey(key), keyExpire, value);
      return;
    }

    await this._setAsync(this._prefixKey(key), value);
  }

  async has(key: string): Promise<boolean> {
    const result = await this.get(key);
    return result !== null;
  }

  delete(key: string): Promise<number> {
    return this._delAsync(this._prefixKey(key));
  }
}
