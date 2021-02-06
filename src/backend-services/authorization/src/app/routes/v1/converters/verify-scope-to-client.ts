import { castTimestampToDate } from '@packages/proto';

import { VerifyScopeParams } from '@root/services/auth/types';

import { VerifyScopeRequest } from '../types';

export function mapVerifyScopeParamsToClient(params: VerifyScopeRequest): VerifyScopeParams {
  const { accessToken, accessTokenExpiresAt, user } = params;

  return {
    accessToken,
    accessTokenExpiresAt: castTimestampToDate(accessTokenExpiresAt),
    user: {
      id: user.id,
    },
  };
}
