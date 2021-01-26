import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

import { GetSignupTokenRequest } from '../types';

export async function getSignupTokenHandler(ctx: AppContext): Promise<void> {
  const data: GetSignupTokenRequest = ctx.data;
  const user = await AuthService.getUserByEmail(data);

  const response: AuthorizationTypes.GetSignupTokenResponse = {
    id: user ? user.id : undefined,
    token: user ? user.signupToken : undefined,
  };

  ctx.body = response;
}
