import * as AuthorizationSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AuthorizationCommand {
  Registration = 'registration',
}

export const authorizationCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.AUTHORIZATION,
  [
    {
      command: AuthorizationCommand.Registration,
      requestSchema: AuthorizationSchemas.registrationRequest,
      responseSchema: AuthorizationSchemas.registrationResponse,
    },
  ],
  Version.v1,
  AuthorizationSchemas.error,
);
