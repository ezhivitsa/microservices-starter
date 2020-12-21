import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { RevokeTokenParams } from '../types';

import { mapUserDataToProto } from './user-to-proto';

export function mapRevokeTokenToProto(params: RevokeTokenParams): AuthorizationTypes.RevokeTokenRequest {
  const { refreshToken, refreshTokenExpiresAt, user } = params;

  return {
    refreshToken,
    refreshTokenExpiresAt: castDateToTimestamp(refreshTokenExpiresAt),
    user: mapUserDataToProto(user),
  };
}
