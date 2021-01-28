import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AccountService } from 'services';

export async function verifyEmailHandler(ctx: RouterAppContext): Promise<void> {
  const { token }: ServiceTypes.VerifyEmailParams = ctx.state.validatedRequest.value;

  await AccountService.verifyEmail(
    {
      token,
    },
    ctx.state,
  );

  ctx.body = null;
}
