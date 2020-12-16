import { CacheStorageService } from './cache-storage-service';

import { AUTH_PREFIX, REFRESH_TOKEN_PREFIX } from 'constants/app-constants';
import { Cache } from 'lib/cache';

interface RefreshTokenData {
  expiresAt: Date;
  userId: string;
}

export class RefreshTokenStorageService extends CacheStorageService<RefreshTokenData> {
  protected _cache: Cache = new Cache([AUTH_PREFIX, REFRESH_TOKEN_PREFIX]);

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
