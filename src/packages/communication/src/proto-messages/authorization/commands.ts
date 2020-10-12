import * as AuthorizationSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema } from '../../messages';
import { Channel } from '../../channels';

export enum AuthorizationCommand {
  Registration = 'registration',
}

export const authorizationCommandSchemas: Record<AuthorizationCommand, ChannelCommandSchema> = getChannelCommands(
  Channel.AUTHORIZATION,
  {
    [AuthorizationCommand.Registration]: {
      requestSchema: AuthorizationSchemas.registrationRequest,
      responseSchema: AuthorizationSchemas.registrationResponse,
    },
  },
  AuthorizationSchemas.error,
);
