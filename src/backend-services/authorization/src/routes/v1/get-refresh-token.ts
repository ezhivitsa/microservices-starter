import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapRefreshTokenDataToProto } from './converters';

export async function getRefreshTokenHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.GetRefreshTokenRequest = ctx.data;
  const token = await AuthService.getRefreshToken(data);

  ctx.body = mapRefreshTokenDataToProto(token);
}
