import { UserTypes, UserCommand, UserEvent, CommonTypes } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';

import { BaseClient } from '../base-client';
import { CommandMetadata } from '../types';

import { UsersError } from './users-error';

export class UsersClient extends BaseClient<UsersError> {
  _channel = Channel.USERS;

  _getClientError(err: Error): UsersError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new UsersError(errorData);
  }

  registrationCommand(data: UserTypes.RegistrationRequest, metadata: CommandMetadata): Promise<void> {
    return this._sendCommand(
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
    return this._sendCommand(
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
    return this._sendCommand({ data, command: UserCommand.UpdateUser }, metadata);
  }

  userCreatedEvent(data: UserTypes.UserCreatedData, metadata: CommonTypes.EventMeta): void {
    this._sendEvent<UserTypes.UserCreatedEvent>({
      data: {
        data,
        metadata,
      },
      event: UserEvent.UserCreated,
    });
  }
}
