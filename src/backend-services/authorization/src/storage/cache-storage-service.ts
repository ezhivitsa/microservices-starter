import { Cache } from 'lib/cache';

export abstract class CacheStorageService<T> {
  protected abstract _cache: Cache;

  abstract _stringToData(value: string): T | null;

  async find(key: string): Promise<T | null> {
    const value = await this._cache.get(key);
    return value ? this._stringToData(value) : null;
  }
}
