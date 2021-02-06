import { accessTokenStorageService, refreshTokenStorageService } from '@root/storage';

import { SaveTokenParams } from './types';

export async function saveToken(data: SaveTokenParams): Promise<void> {
  const createAccessTokenPromise = accessTokenStorageService.create(
    data.accessToken,
    {
      expiresAt: data.accessTokenExpiresAt,
      userId: data.user.id,
    },
    data.accessTokenExpiresAt,
  );

  const createRefreshTokenPromise = refreshTokenStorageService.create(
    data.refreshToken,
    {
      expiresAt: data.refreshTokenExpiresAt,
      userId: data.user.id,
    },
    data.refreshTokenExpiresAt,
  );

  await Promise.all([createAccessTokenPromise, createRefreshTokenPromise]);
}
