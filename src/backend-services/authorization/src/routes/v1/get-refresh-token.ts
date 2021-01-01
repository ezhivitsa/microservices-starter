import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { mapRefreshTokenDataToProto } from './converters';
import { GetRefreshTokenRequest } from './types';

export async function getRefreshTokenHandler(ctx: AppContext): Promise<void> {
  const data: GetRefreshTokenRequest = ctx.data;
  const token = await AuthService.getRefreshToken(data);

  ctx.body = mapRefreshTokenDataToProto(token);
}
