import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from '@root/services';

import { RegistrationRequest } from '../types';

export async function signUpHandler(ctx: AppContext): Promise<void> {
  const data: RegistrationRequest = ctx.data;
  const user = await AuthService.register(data);

  const response: AuthorizationTypes.RegistrationResponse = {
    id: user.id,
    signupToken: user.signupToken,
  };
  ctx.body = response;
}
