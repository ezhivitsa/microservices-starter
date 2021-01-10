import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapVerifyScopeParamsToClient } from '../converters';
import { VerifyScopeRequest } from '../types';

export async function verifyScopeHandler(ctx: AppContext): Promise<void> {
  const data: VerifyScopeRequest = ctx.data;
  const verified = await AuthService.verifyScope(mapVerifyScopeParamsToClient(data));

  const response: AuthorizationTypes.VerifyScopeResponse = {
    verified,
  };

  ctx.body = response;
}
