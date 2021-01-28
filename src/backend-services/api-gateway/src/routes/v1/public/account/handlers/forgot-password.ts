import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AccountService } from 'services';

export async function forgotPasswordHandler(ctx: RouterAppContext): Promise<void> {
  const { email }: ServiceTypes.ForgotPasswordRequest = ctx.state.validatedRequest.value;

  await AccountService.sendForgotPasswordEmail({ email }, ctx.state);

  ctx.body = null;
}
