import { castTimestampToDate } from '@packages/proto';

import { RevokeTokenParams } from 'services/auth/types';

import { RevokeTokenRequest } from '../types';

export function mapRevokeTokenParamsToClient(params: RevokeTokenRequest): RevokeTokenParams {
  const { refreshToken, refreshTokenExpiresAt, user } = params;

  return {
    refreshToken,
    refreshTokenExpiresAt: castTimestampToDate(refreshTokenExpiresAt),
    user: {
      id: user.id,
    },
  };
}
