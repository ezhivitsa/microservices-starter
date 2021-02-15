import { usersClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { mapMetadataToProto } from '../converters';
import { mapUserDataToClient } from './converters';

import { RegisterParams, GetUserByAuthIdParams, User, UpdateUserParams } from './types';

export function register(params: RegisterParams, metadata: ProviderTypes.Metadata): Promise<void> {
  return usersClient.registrationCommand(params, mapMetadataToProto(metadata));
}

export async function getUserByAuthId(
  params: GetUserByAuthIdParams,
  metadata: ProviderTypes.Metadata,
): Promise<User | null> {
  const { user } = await usersClient.getUserByAuthIdCommand(params, mapMetadataToProto(metadata));
  return user ? mapUserDataToClient(user) : null;
}

export async function updateUser(params: UpdateUserParams, metadata: ProviderTypes.Metadata): Promise<User | null> {
  const { user } = await usersClient.updateUserCommand(params, mapMetadataToProto(metadata));
  return user ? mapUserDataToClient(user) : null;
}
