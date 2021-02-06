import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { GetRefreshTokenResult } from '@root/services/auth/types';

import { mapUserDataToProto } from './user-to-proto';

export function mapRefreshTokenDataToProto(
  data: GetRefreshTokenResult | null,
): AuthorizationTypes.GetRefreshTokenResponse {
  if (!data) {
    return {
      token: undefined,
    };
  }

  const { refreshToken, refreshTokenExpiresAt, user } = data;

  return {
    token: {
      refreshToken,
      refreshTokenExpiresAt: castDateToTimestamp(refreshTokenExpiresAt),
      user: mapUserDataToProto(user),
    },
  };
}
