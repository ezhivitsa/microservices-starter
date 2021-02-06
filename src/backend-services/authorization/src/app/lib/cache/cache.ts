import redis, { Callback } from 'redis';
import { promisify } from 'util';

import { config } from '@root/lib/config';

const client = redis.createClient(config.redis);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del as (arg1: string | string[], cb?: Callback<number>) => boolean).bind(client);

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
