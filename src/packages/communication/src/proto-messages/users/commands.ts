import * as UserSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum UserCommand {
  Registration = 'registration',
  GetUserByAuthId = 'get-user-by-auth-id',
  UpdateUser = 'update-user',
}

export const userCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.Users,
  [
    {
      command: UserCommand.Registration,
      requestSchema: UserSchemas.registrationRequest,
    },
    {
      command: UserCommand.GetUserByAuthId,
      requestSchema: UserSchemas.getUserByAuthIdRequest,
      responseSchema: UserSchemas.getUserByAuthIdResponse,
    },
    {
      command: UserCommand.UpdateUser,
      requestSchema: UserSchemas.updateUserRequest,
      responseSchema: UserSchemas.updateUserResponse,
    },
  ],
  Version.v1,
  UserSchemas.error,
);
