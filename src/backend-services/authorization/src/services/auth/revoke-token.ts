import { refreshTokenStorageService } from 'storage';

import { RevokeTokenParams } from './types';

export async function revokeToken(data: RevokeTokenParams): Promise<void> {
  await refreshTokenStorageService.delete(data.refreshToken);
}
