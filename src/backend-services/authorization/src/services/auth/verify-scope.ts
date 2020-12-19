import { accessTokenStorageService, usersStorageService } from 'storage';

import { VerifyScopeParams } from './types';

export async function verifyScope(data: VerifyScopeParams): Promise<boolean> {
  const [accessTokenData, user] = await Promise.all([
    accessTokenStorageService.find(data.accessToken),
    usersStorageService.findById(data.user.id),
  ]);
  if (!accessTokenData || !user) {
    return false;
  }

  return user.id === accessTokenData.userId;
}
