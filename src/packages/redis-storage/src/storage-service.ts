import { Cache } from './cache';

export abstract class StorageService<T> {
  protected abstract _cache: Cache;

  abstract _stringToData(value: string): T | null;

  async find(key: string): Promise<T | null> {
    const value = await this._cache.get(key);
    return value ? this._stringToData(value) : null;
  }

  async create(key: string, data: T, expiresAt: Date): Promise<void> {
    const expiresIn = expiresAt.getTime() - Date.now();
    await this._cache.set(key, JSON.stringify(data), expiresIn);
  }

  async delete(key: string): Promise<void> {
    await this._cache.delete(key);
  }
}
