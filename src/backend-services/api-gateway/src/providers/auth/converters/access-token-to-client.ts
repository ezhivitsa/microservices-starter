import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { AccessToken } from '../types';

import { mapUserDataToClient } from './user-to-client';

export function mapAccessTokenDataToClient(data: AuthorizationTypes.GetAccessTokenResponse): AccessToken | null {
  if (!data.token) {
    return null;
  }

  const { accessToken, accessTokenExpiresAt, user } = data.token;

  if (!accessToken || !accessTokenExpiresAt || !user) {
    return null;
  }

  const clientUser = mapUserDataToClient(user);
  if (!clientUser) {
    return null;
  }

  return {
    accessToken,
    accessTokenExpiresAt: castTimestampToDate(accessTokenExpiresAt),
    user: clientUser,
  };
}
