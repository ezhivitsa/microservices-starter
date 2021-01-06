import { UsersProvider } from 'providers';

import { ServiceMetadata } from '../types';
import { GetUserByAuthIdParams, UserResult } from './types';

export async function getUserByAuthId(
  params: GetUserByAuthIdParams,
  metadata: ServiceMetadata,
): Promise<UserResult | null> {
  return UsersProvider.getUserByAuthId(params, metadata);
}
