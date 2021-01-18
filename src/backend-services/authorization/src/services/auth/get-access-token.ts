import { UserAttributes } from 'lib/db/models/user';

import { accessTokenStorageService, usersStorageService } from 'storage';

import { GetAccessTokenParams, GetAccessTokenResult } from './types';

export async function getAccessToken(data: GetAccessTokenParams): Promise<GetAccessTokenResult | null> {
  const accessTokenData = await accessTokenStorageService.find(data.accessToken);
  if (!accessTokenData) {
    return null;
  }

  const user = await usersStorageService.findById(accessTokenData.userId);
  if (!user) {
    return null;
  }

  return {
    accessToken: data.accessToken,
    accessTokenExpiresAt: accessTokenData.expiresAt,
    user: user.toJSON() as UserAttributes,
  };
}
