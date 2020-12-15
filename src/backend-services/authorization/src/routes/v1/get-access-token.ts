import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { mapAccessTokenDataToProto } from './converters';

export async function getAccessTokenHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.GetAccessTokenRequest = ctx.data;
  const token = await AuthService.getAccessToken(data);

  ctx.body = mapAccessTokenDataToProto(token);
}
