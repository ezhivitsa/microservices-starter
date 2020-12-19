import { AuthorizationTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { GetAccessTokenResult } from 'services/auth/types';

import { mapUserDataToProto } from './user-to-proto';

export function mapAccessTokenDataToProto(
  data: GetAccessTokenResult | null,
): AuthorizationTypes.GetAccessTokenResponse {
  if (!data) {
    return {
      token: undefined,
    };
  }

  const { accessToken, accessTokenExpiresAt, user } = data;

  return {
    token: {
      accessToken,
      accessTokenExpiresAt: castDateToTimestamp(accessTokenExpiresAt),
      user: mapUserDataToProto(user),
    },
  };
}
