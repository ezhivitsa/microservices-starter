import { AppContext } from '@packages/koa-kafka';

import { AuthService } from '@root/services';

import { CancelRegistrationRequest } from '../types';

export async function cancelRegistrationHandler(ctx: AppContext): Promise<void> {
  const data: CancelRegistrationRequest = ctx.data;
  await AuthService.deleteUser(data);

  ctx.body = null;
}
