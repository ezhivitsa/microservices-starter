import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AccountService } from 'services';

export async function signUpHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.SignUpRequest = ctx.state.validatedRequest.value;

  await AccountService.register(
    {
      ...data,
      owner: true,
    },
    ctx.state,
  );

  ctx.body = null;
}
