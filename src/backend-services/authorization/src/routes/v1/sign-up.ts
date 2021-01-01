import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { RegistrationRequest } from './types';

export async function signUpHandler(ctx: AppContext): Promise<void> {
  const data: RegistrationRequest = ctx.data;
  await AuthService.register(data);

  ctx.body = null;
}
