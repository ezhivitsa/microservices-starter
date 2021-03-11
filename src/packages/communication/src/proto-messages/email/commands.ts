import * as EmailSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum EmailCommand {
  SendVerifyEmail = 'send-verify-email',
  SendForgotPasswordEmail = 'send-forgot-password-email',
}

export const emailCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.Email,
  [
    {
      command: EmailCommand.SendVerifyEmail,
      requestSchema: EmailSchemas.sendVerifyEmailRequest,
    },
    {
      command: EmailCommand.SendForgotPasswordEmail,
      requestSchema: EmailSchemas.sendForgotPasswordEmailRequest,
    },
  ],
  Version.v1,
  EmailSchemas.error,
);
