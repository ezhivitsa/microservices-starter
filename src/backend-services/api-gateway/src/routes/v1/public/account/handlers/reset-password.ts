import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AccountService } from 'services';

export async function resetPasswordHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.ResetPasswordRequest = ctx.state.validatedRequest.value;

  await AccountService.resetPassword({ token: data.token, password: data.password }, ctx.state);

  ctx.body = null;
}
