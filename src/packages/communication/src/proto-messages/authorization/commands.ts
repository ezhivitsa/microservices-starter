import * as AuthorizationSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AuthorizationCommand {
  Registration = 'registration',
  SignIn = 'sign-in',
}

export const authorizationCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.AUTHORIZATION,
  [
    {
      command: AuthorizationCommand.Registration,
      requestSchema: AuthorizationSchemas.registrationRequest,
      responseSchema: AuthorizationSchemas.registrationResponse,
    },
    {
      command: AuthorizationCommand.SignIn,
      requestSchema: AuthorizationSchemas.signInRequest,
      responseSchema: AuthorizationSchemas.signInResponse,
    },
  ],
  Version.v1,
  AuthorizationSchemas.error,
);
