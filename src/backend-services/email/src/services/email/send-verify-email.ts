import { AuthPaths } from '@packages/common';

import { Template, NO_REPLY_EMAIL } from 'constants/email-constants';

import { send } from 'lib/mailer';
import { config } from 'lib/config';

import { signup } from 'texts';

import { SendVerifyEmailParams } from './types';

export async function sendVerifyEmail(params: SendVerifyEmailParams): Promise<void> {
  const fullName = `${params.firstName || ''} ${params.lastName}`.trim();
  const verifyUrl = `${config.webUrl}${AuthPaths.verifyEmailPath({ fullPath: true, token: params.token })}`;

  const data = {
    fullName,
    verifyUrl,
  };

  await send(Template.SignupWelcome, data, {
    to: params.email,
    from: NO_REPLY_EMAIL,
    subject: signup.title,
  });
}
