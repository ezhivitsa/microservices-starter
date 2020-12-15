import { AppContext } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { AuthService } from 'services';

export async function signUpHandler(ctx: AppContext): Promise<void> {
  const data: AuthorizationTypes.RegistrationRequest = ctx.data;
  await AuthService.register(data);

  ctx.body = null;
}
