import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { mapAccessTokenDataToProto } from './converters';
import { GetAccessTokenRequest } from './types';

export async function getAccessTokenHandler(ctx: AppContext): Promise<void> {
  const data: GetAccessTokenRequest = ctx.data;
  const token = await AuthService.getAccessToken(data);

  ctx.body = mapAccessTokenDataToProto(token);
}
