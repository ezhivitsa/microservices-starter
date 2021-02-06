import { CacheStorageService } from './cache-storage-service';

import { AUTH_PREFIX, ACCESS_TOKEN_PREFIX } from '@root/constants/app-constants';
import { Cache } from '@root/lib/cache';

interface AccessTokenData {
  expiresAt: Date;
  userId: string;
}

export class AccessTokenStorageService extends CacheStorageService<AccessTokenData> {
  protected _cache: Cache = new Cache([AUTH_PREFIX, ACCESS_TOKEN_PREFIX]);

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
