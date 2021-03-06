import { UsersClient, UserTypes } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const usersClient = new UsersClient(kafka);

const v1Metadata = {
  requestId: '1',
};

export function register(data: UserTypes.RegistrationRequest): Promise<void> {
  return usersClient.registrationCommand(data, v1Metadata);
}

export function getUserByAuthId(data: UserTypes.GetUserByAuthIdRequest): Promise<UserTypes.GetUserByAuthIdResponse> {
  return usersClient.getUserByAuthIdCommand(data, v1Metadata);
}

export function updateUser(data: UserTypes.UpdateUserRequest): Promise<UserTypes.UpdateUserResponse> {
  return usersClient.updateUserCommand(data, v1Metadata);
}
