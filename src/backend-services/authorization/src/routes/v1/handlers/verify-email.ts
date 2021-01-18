import { AppContext } from '@packages/koa-kafka';

import { AuthService } from 'services';

import { VerifyEmailRequest } from '../types';

export async function verifyEmailHandler(ctx: AppContext): Promise<void> {
  const data: VerifyEmailRequest = ctx.data;

  await AuthService.verifyEmail(data);

  ctx.body = null;
}
