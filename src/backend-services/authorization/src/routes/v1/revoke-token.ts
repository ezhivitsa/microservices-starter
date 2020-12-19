import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapRevokeTokenParamsToClient } from './converters';

export async function revokeTokenHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.RevokeTokenRequest = ctx.data;
  await AuthService.revokeToken(mapRevokeTokenParamsToClient(data));

  ctx.body = null;
}
