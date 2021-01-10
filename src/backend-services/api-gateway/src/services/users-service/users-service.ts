import { UsersProvider } from 'providers';

import { ServiceMetadata } from '../types';
import { GetUserByAuthIdParams, UserResult, UpdateUserParams } from './types';

export async function getUserByAuthId(
  params: GetUserByAuthIdParams,
  metadata: ServiceMetadata,
): Promise<UserResult | null> {
  return UsersProvider.getUserByAuthId(params, metadata);
}

export async function updateUser(params: UpdateUserParams, metadata: ServiceMetadata): Promise<UserResult | null> {
  return UsersProvider.updateUser(params, metadata);
}
