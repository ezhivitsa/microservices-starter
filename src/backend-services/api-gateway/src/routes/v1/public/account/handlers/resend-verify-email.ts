import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AccountService } from 'services';

export async function resendVerifyEmailHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.ResendVerifyEmailRequest = ctx.state.validatedRequest.value;

  await AccountService.resendVerifyEmail(
    {
      email: data.email,
    },
    ctx.state,
  );

  ctx.body = null;
}
