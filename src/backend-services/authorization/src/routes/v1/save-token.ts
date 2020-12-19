import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapSaveTokenParamsToClient } from './converters';

export async function saveTokenHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.SaveTokenRequest = ctx.data;
  await AuthService.saveToken(mapSaveTokenParamsToClient(data));

  ctx.body = null;
}
