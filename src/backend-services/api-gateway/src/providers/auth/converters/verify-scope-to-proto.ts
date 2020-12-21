import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { VerifyScopeParams } from '../types';

import { mapUserDataToProto } from './user-to-proto';

export function mapVerifyScopeToProto(params: VerifyScopeParams): AuthorizationTypes.VerifyScopeRequest {
  const { accessToken, accessTokenExpiresAt, user } = params;

  return {
    accessToken,
    accessTokenExpiresAt: castDateToTimestamp(accessTokenExpiresAt),
    user: mapUserDataToProto(user),
  };
}
