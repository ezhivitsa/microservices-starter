import { RouterAppContext } from 'koa';

import { AccountService } from 'services';

export async function verifyEmailHandler(ctx: RouterAppContext): Promise<void> {
  const token: string = ctx.params.token;

  await AccountService.verifyEmail(
    {
      token,
    },
    ctx.state,
  );

  ctx.body = null;
}