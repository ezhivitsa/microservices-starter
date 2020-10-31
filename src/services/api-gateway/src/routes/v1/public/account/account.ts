import { RouterAppContext } from 'koa';

import { accountService } from 'services';

import { SignUpRequest } from './types';

export async function signUp(ctx: RouterAppContext): Promise<void> {
  const data: SignUpRequest = ctx.state.validatedRequest.value;

  const result = await accountService.register(data, ctx.state);
}
