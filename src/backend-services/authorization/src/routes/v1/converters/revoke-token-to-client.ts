import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { RevokeTokenParams } from 'services/auth/types';

export function mapRevokeTokenParamsToClient(params: AuthorizationTypes.RevokeTokenRequest): RevokeTokenParams {
  const { refreshToken, refreshTokenExpiresAt, user } = params;

  return {
    refreshToken,
    refreshTokenExpiresAt: castTimestampToDate(refreshTokenExpiresAt),
    user: {
      id: user.id,
    },
  };
}
