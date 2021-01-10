import * as UsersSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';
import { UserSchemas } from '.';

export enum UserCommand {
  Registration = 'registration',
  GetUserByAuthId = 'get-user-by-auth-id',
  UpdateUser = 'update-user',
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
    {
      command: UserCommand.UpdateUser,
      requestSchema: UserSchemas.updateUserRequest,
      responseSchema: UsersSchemas.updateUserResponse,
    },
  ],
  Version.v1,
  UsersSchemas.error,
);
