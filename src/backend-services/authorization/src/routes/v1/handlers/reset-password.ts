import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { ResetPasswordRequest } from '../types';

export async function resetPasswordHandler(ctx: AppContext): Promise<void> {
  const data: ResetPasswordRequest = ctx.data;
  await AuthService.resetPassword(data);

  ctx.body = null;
}
