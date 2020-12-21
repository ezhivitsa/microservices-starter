import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { SaveTokenParams } from '../types';

import { mapUserDataToProto } from './user-to-proto';

export function mapSaveTokenToProto(params: SaveTokenParams): AuthorizationTypes.SaveTokenRequest {
  const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, user } = params;

  return {
    accessToken,
    accessTokenExpiresAt: castDateToTimestamp(accessTokenExpiresAt),
    refreshToken,
    refreshTokenExpiresAt: castDateToTimestamp(refreshTokenExpiresAt),
    user: mapUserDataToProto(user),
  };
}
