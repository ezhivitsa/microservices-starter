import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapRefreshTokenDataToProto } from './converters';

export async function saveTokeHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.SaveTokenRequest = ctx.data;
  const token = await AuthService.saveToken(data);

  ctx.body = mapRefreshTokenDataToProto(token);
}
