import { UserAttributes } from 'lib/db/models/user';

import { refreshTokenStorageService, usersStorageService } from 'storage';

import { GetRefreshTokenParams, GetRefreshTokenResult } from './types';

export async function getRefreshToken(data: GetRefreshTokenParams): Promise<GetRefreshTokenResult | null> {
  const refreshTokenData = await refreshTokenStorageService.find(data.refreshToken);
  if (!refreshTokenData) {
    return null;
  }

  const user = await usersStorageService.findById(refreshTokenData.userId);
  if (!user) {
    return null;
  }

  return {
    refreshToken: data.refreshToken,
    refreshTokenExpiresAt: refreshTokenData.expiresAt,
    user: user.toJSON() as UserAttributes,
  };
}
