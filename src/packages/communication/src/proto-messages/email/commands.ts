import * as EmailSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum EmailCommand {
  SendVerifyEmail = 'send-verify-email',
}

export const emailCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.EMAIL,
  [
    {
      command: EmailCommand.SendVerifyEmail,
      requestSchema: EmailSchemas.sendVerifyEmailRequest,
    },
  ],
  Version.v1,
  EmailSchemas.error,
);
