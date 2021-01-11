import { usersStorageService } from 'storage';

import { GetUserByAuthIdParams, User } from './types';

export async function getUserByAuthId(data: GetUserByAuthIdParams): Promise<User | null> {
  const { authId } = data;

  const user = await usersStorageService.findOneByFilter({ authId });
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || undefined,
    lastName: user.lastName,
  };
}
