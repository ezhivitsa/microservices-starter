import { RevokeTokenParams } from 'services/auth/types';

import { RevokeTokenRequest } from '../types';

export function mapRevokeTokenParamsToClient(params: RevokeTokenRequest): RevokeTokenParams {
  const { accessToken, refreshToken, user } = params;

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
    },
  };
}
