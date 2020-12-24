import { RouterAppContext } from 'koa';

import { AccountService } from 'services';

import { SignUpRequest, SignInRequest } from './types';

export async function signUp(ctx: RouterAppContext): Promise<void> {
  const data: SignUpRequest = ctx.state.validatedRequest.value;

  const result = await AccountService.register(data, ctx.state);
}

export async function signIn(ctx: RouterAppContext): Promise<void> {
  const data: SignInRequest = ctx.state.validatedRequest.value;

  const result = await AccountService.signIn(data, ctx.state);
  ctx.body = result;
}
