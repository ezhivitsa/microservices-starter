import * as UsersSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserCommand {
  Registration = 'registration',
  GetCurrentUser = 'get-current-user',
}

export const userCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.USERS,
  [
    {
      command: UserCommand.Registration,
      requestSchema: UsersSchemas.registrationRequest,
    },
    {
      command: UserCommand.GetCurrentUser,
      requestSchema: UsersSchemas.getCurrentUserRequest,
      responseSchema: UsersSchemas.getCurrentUserResponse,
    },
  ],
  Version.v1,
);
