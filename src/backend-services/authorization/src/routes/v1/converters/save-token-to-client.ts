import { castTimestampToDate } from '@packages/proto';

import { SaveTokenParams } from 'services/auth/types';

import { SaveTokenRequest } from '../types';

export function mapSaveTokenParamsToClient(params: SaveTokenRequest): SaveTokenParams {
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
