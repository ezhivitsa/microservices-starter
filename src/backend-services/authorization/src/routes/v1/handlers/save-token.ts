import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { mapSaveTokenParamsToClient } from '../converters';
import { SaveTokenRequest } from '../types';

export async function saveTokenHandler(ctx: AppContext): Promise<void> {
  const data: SaveTokenRequest = ctx.data;
  await AuthService.saveToken(mapSaveTokenParamsToClient(data));

  ctx.body = null;
}
