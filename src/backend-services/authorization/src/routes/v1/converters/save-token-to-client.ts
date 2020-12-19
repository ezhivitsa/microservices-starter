import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { SaveTokenParams } from 'services/auth/types';

export function mapSaveTokenParamsToClient(params: AuthorizationTypes.SaveTokenRequest): SaveTokenParams {
  const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, user } = params;

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt: castTimestampToDate(accessTokenExpiresAt),
    refreshTokenExpiresAt: castTimestampToDate(refreshTokenExpiresAt),
    user: {
      id: user.id,
    },
  };
}
