import { StorageService, Cache } from '@packages/redis-storage';

import { cache } from '@root/lib/cache';

interface AccessTokenData {
  expiresAt: Date;
  userId: string;
}

export class AccessTokenStorageService extends StorageService<AccessTokenData> {
  protected _cache: Cache = cache.AccessToken;

  private _isAccessTokenData(data: any): data is AccessTokenData {
    return data && typeof data === 'object' && data.hasOwnProperty('expiresAt') && data.hasOwnProperty('userId');
  }

  _stringToData(value: string): AccessTokenData | null {
    const data = JSON.parse(value);

    if (!this._isAccessTokenData(data)) {
      return null;
    }

    const { expiresAt, userId } = data;

    return {
      userId,
      expiresAt: new Date(expiresAt),
    };
  }
}

export const accessTokenStorageService = new AccessTokenStorageService();
