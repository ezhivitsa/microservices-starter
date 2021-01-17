import { AuthorizationTypes } from '@packages/communication';

import { RevokeTokenParams } from '../types';

import { mapUserDataToProto } from './user-to-proto';

export function mapRevokeTokenToProto(params: RevokeTokenParams): AuthorizationTypes.RevokeTokenRequest {
  const { refreshToken, accessToken, user } = params;

  return {
    accessToken,
    refreshToken,
    user: mapUserDataToProto(user),
  };
}
