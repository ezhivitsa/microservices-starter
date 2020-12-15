import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

export async function getRefreshTokenHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.GetRefreshTokenRequest = ctx.data;
  ctx.body = await AuthService.getRefreshToken(data);
}
