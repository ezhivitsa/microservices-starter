import * as AuthorizationSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AuthorizationCommand {
  Registration = 'registration',
  GetAccessToken = 'get-access-token',
  GetRefreshToken = 'get-refresh-token',
  GetUser = 'get-user',
  SaveToken = 'save-token',
  RevokeToken = 'revoke-token',
  VerifyScope = 'verify-scope',
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
);
