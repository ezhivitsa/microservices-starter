import { AppContext } from '@packages/koa-kafka';

import { UsersService } from 'services';

import { RegistrationRequest } from '../types';

export async function signUpHandler(ctx: AppContext): Promise<void> {
  const data: RegistrationRequest = ctx.data;
  await UsersService.register(data);

  ctx.body = null;
}
