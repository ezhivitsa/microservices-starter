import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { AccessToken } from '../types';

import { mapUserDataToClient } from './user-to-client';

export function mapAccessTokenDataToClient(data: AuthorizationTypes.GetAccessTokenResponse): AccessToken | null {
  if (!data.token) {
    return null;
  }

  const { accessToken, accessTokenExpiresAt, user } = data.token;

  return {
    accessToken,
    accessTokenExpiresAt: castTimestampToDate(accessTokenExpiresAt),
    user: mapUserDataToClient(user),
  };
}
