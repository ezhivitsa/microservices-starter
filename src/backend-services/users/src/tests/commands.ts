import { UsersClient, UserTypes, CommandUserRole, ClientCommandMetadata } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const usersClient = new UsersClient(kafka);

const v1Metadata: ClientCommandMetadata = {
  requestId: '1',
  user: {
    id: '1',
    roles: [CommandUserRole.User, CommandUserRole.Admin, CommandUserRole.OrganizationAdmin],
  },
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

export function getUsers(): Promise<UserTypes.GetUsersResponse> {
  return usersClient.getUsersCommand(v1Metadata);
}
