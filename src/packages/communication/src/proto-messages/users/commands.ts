import * as UsersSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserCommand {
  Registration = 'registration',
  GetUserByAuthId = 'get-user-by-auth-id',
}

export const userCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.USERS,
  [
    {
      command: UserCommand.Registration,
      requestSchema: UsersSchemas.registrationRequest,
    },
    {
      command: UserCommand.GetUserByAuthId,
      requestSchema: UsersSchemas.getUserByAuthIdRequest,
      responseSchema: UsersSchemas.getUserByAuthIdResponse,
    },
  ],
  Version.v1,
);
