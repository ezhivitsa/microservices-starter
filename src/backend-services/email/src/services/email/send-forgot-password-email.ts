import { FrontPaths } from '@packages/common';

import { Template, NO_REPLY_EMAIL } from 'constants/email-constants';

import { send } from 'lib/mailer';
import { config } from 'lib/config';

import { forgotPassword } from 'texts';

import { SendForgotPasswordEmailParams } from './types';

export async function sendForgotPasswordEmail(params: SendForgotPasswordEmailParams): Promise<void> {
  const fullName = `${params.firstName || ''} ${params.lastName}`.trim();
  const resetPasswordUrl = `${config.webUrl}${FrontPaths.Auth.resetPasswordPath({
    fullPath: true,
    token: params.token,
  })}`;

  const data = {
    fullName,
    resetPasswordUrl,
  };

  await send(Template.ForgotPassword, data, {
    to: params.email,
    from: NO_REPLY_EMAIL,
    subject: forgotPassword.title,
  });
}
