import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { RefreshToken } from '../types';

import { mapUserDataToClient } from './user-to-client';

export function mapRefreshTokenDataToClient(data: AuthorizationTypes.GetRefreshTokenResponse): RefreshToken | null {
  if (!data.token) {
    return null;
  }

  const { refreshToken, refreshTokenExpiresAt, user } = data.token;

  if (!refreshToken || !refreshTokenExpiresAt || !user) {
    return null;
  }

  const clientUser = mapUserDataToClient(user);
  if (!clientUser) {
    return null;
  }

  return {
    refreshToken,
    refreshTokenExpiresAt: castTimestampToDate(refreshTokenExpiresAt),
    user: clientUser,
  };
}
