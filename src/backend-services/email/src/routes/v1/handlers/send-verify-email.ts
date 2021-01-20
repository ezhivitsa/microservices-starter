import { AppContext } from '@packages/koa-kafka';

import { EmailService } from 'services';

import { SendVerifyEmailRequest } from '../types';

export async function sendVerifyEmailHandler(ctx: AppContext): Promise<void> {
  const data: SendVerifyEmailRequest = ctx.data;

  await EmailService.sendVerifyEmail(data);

  ctx.body = null;
}
