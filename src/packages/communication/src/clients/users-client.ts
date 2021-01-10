import { UserTypes, UserCommand, UserEvent } from '../proto-messages';

import { BaseClient } from './base-client';
import { CommandMetadata, EventMetadata } from './types';

export class UsersClient extends BaseClient {
  registrationCommand(data: UserTypes.RegistrationRequest, metadata: CommandMetadata): Promise<void> {
    return this._kafka.sendCommand(
      {
        data,
        command: UserCommand.Registration,
      },
      metadata,
    );
  }

  getUserByAuthIdCommand(
    data: UserTypes.GetUserByAuthIdRequest,
    metadata: CommandMetadata,
  ): Promise<UserTypes.GetUserByAuthIdResponse> {
    return this._kafka.sendCommand(
      {
        data,
        command: UserCommand.GetUserByAuthId,
      },
      metadata,
    );
  }

  updateUserCommand(
    data: UserTypes.UpdateUserRequest,
    metadata: CommandMetadata,
  ): Promise<UserTypes.UpdateUserResponse> {
    return this._kafka.sendCommand({ data, command: UserCommand.UpdateUser }, metadata);
  }

  userCreatedEvent(data: UserTypes.UserCreatedEvent, metadata: EventMetadata): void {
    this._kafka.sendEvent(
      {
        data,
        event: UserEvent.UserCreated,
      },
      metadata,
    );
  }
}
