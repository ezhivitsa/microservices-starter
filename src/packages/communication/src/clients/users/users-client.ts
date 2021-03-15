import { UserTypes, UserCommand, UserEvent, CommonTypes } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';
import { Version } from '../../messages';

import { BaseClient } from '../base-client';
import { ClientCommandMetadata } from '../types';

import { UsersError } from './users-error';

export class UsersClient extends BaseClient<UsersError> {
  _channel = Channel.Users;
  _version = Version.v1;

  _getClientError(err: Error): UsersError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new UsersError(errorData);
  }

  registrationCommand(data: UserTypes.RegistrationRequest, metadata: ClientCommandMetadata): Promise<void> {
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
    metadata: ClientCommandMetadata,
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
    metadata: ClientCommandMetadata,
  ): Promise<UserTypes.UpdateUserResponse> {
    return this._sendCommand({ data, command: UserCommand.UpdateUser }, metadata);
  }

  getUsersCommand(metadata: ClientCommandMetadata): Promise<UserTypes.GetUsersResponse> {
    return this._sendCommand({ data: null, command: UserCommand.GetUsers }, metadata);
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

  userUpdatedEvent(data: UserTypes.UserUpdatedData, metadata: CommonTypes.EventMeta): void {
    this._sendEvent<UserTypes.UserUpdatedEvent>({
      data: {
        data,
        metadata,
      },
      event: UserEvent.UserUpdated,
    });
  }
}
