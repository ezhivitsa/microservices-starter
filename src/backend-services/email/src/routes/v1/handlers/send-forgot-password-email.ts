import { AppContext } from '@packages/koa-kafka';

import { EmailService } from 'services';

import { SendForgotPasswordEmailRequest } from '../types';

export async function sendForgotPasswordEmailHandler(ctx: AppContext): Promise<void> {
  const data: SendForgotPasswordEmailRequest = ctx.data;

  await EmailService.sendForgotPasswordEmail(data);

  ctx.body = null;
}
