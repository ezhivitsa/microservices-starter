import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { SaveTokenParams } from 'services/auth/types';

import { mapUserToProto } from './user-to-proto';

export function mapSaveTokenParamsToClient(params: AuthorizationTypes.SaveTokenRequest): SaveTokenParams {
  const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, user } = params;

  const { refreshToken, refreshTokenExpiresAt, user } = data;

  return {
    token: {
      refreshToken,
      refreshTokenExpiresAt: castDateToTimestamp(refreshTokenExpiresAt),
      user: mapUserToProto(user),
    },
  };
}
