import { usersClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { mapUserDataToClient } from './converters';
import { RegisterParams, GetUserByAuthIdParams, User, UpdateUserParams } from './types';

export function register(params: RegisterParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return usersClient.registrationCommand(params, metadata);
}

export async function getUserByAuthId(
  params: GetUserByAuthIdParams,
  metadata: ProviderTypes.Metadata,
): Promise<User | null> {
  const { user } = await usersClient.getUserByAuthIdCommand(params, metadata);
  return user ? mapUserDataToClient(user) : null;
}

export async function updateUser(params: UpdateUserParams, metadata: ProviderTypes.Metadata): Promise<User | null> {
  const { user } = await usersClient.updateUserCommand(params, metadata);
  return user ? mapUserDataToClient(user) : null;
}
