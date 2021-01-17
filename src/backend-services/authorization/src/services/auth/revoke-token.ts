import { accessTokenStorageService, refreshTokenStorageService } from 'storage';

import { RevokeTokenParams } from './types';

export async function revokeToken(data: RevokeTokenParams): Promise<void> {
  const promises: Promise<void>[] = [];
  if (data.accessToken) {
    promises.push(accessTokenStorageService.delete(data.accessToken));
  }

  promises.push(refreshTokenStorageService.delete(data.refreshToken));

  await Promise.all(promises);
}
