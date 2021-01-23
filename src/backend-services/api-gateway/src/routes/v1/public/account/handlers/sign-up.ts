import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { config } from 'lib/config';

import { AccountService } from 'services';

export async function signUpHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.SignUpRequest = ctx.state.validatedRequest.value;

  const signupToken = await AccountService.register(
    {
      ...data,
      owner: true,
    },
    ctx.state,
  );

  const response: ServiceTypes.SignUpResponse = {
    signupToken: config.returnSignupToken ? signupToken || undefined : undefined,
  };

  ctx.body = response;
}
