import { AuthorizationTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { VerifyScopeParams } from 'services/auth/types';

export function mapVerifyScopeParamsToClient(params: AuthorizationTypes.VerifyScopeRequest): VerifyScopeParams {
  const { accessToken, accessTokenExpiresAt, user } = params;

  return {
    accessToken,
    accessTokenExpiresAt: castTimestampToDate(accessTokenExpiresAt),
    user: {
      id: user.id,
    },
  };
}
