import { StorageService, Cache } from '@packages/redis-storage';

import { cache } from '@root/lib/cache';

interface RefreshTokenData {
  expiresAt: Date;
  userId: string;
}

export class RefreshTokenStorageService extends StorageService<RefreshTokenData> {
  protected _cache: Cache = cache.RefreshToken;

  private _isAccessTokenData(data: any): data is RefreshTokenData {
    return data && typeof data === 'object' && data.hasOwnProperty('expiresAt') && data.hasOwnProperty('userId');
  }

  _stringToData(value: string): RefreshTokenData | null {
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

export const refreshTokenStorageService = new RefreshTokenStorageService();
