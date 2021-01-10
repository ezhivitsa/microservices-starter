import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { mapRevokeTokenParamsToClient } from '../converters';
import { RevokeTokenRequest } from '../types';

export async function revokeTokenHandler(ctx: AppContext): Promise<void> {
  const data: RevokeTokenRequest = ctx.data;
  await AuthService.revokeToken(mapRevokeTokenParamsToClient(data));

  ctx.body = null;
}
