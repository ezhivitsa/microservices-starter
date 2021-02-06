import { usersStorageService } from '@root/storage';

import { UserAttributes } from '@root/lib/db/models/user';

import { GetUserByIdParams, User } from './types';

export async function getUserById(data: GetUserByIdParams): Promise<User | null> {
  const user = await usersStorageService.findById(data.id);
  if (!user) {
    return null;
  }

  return user.toJSON() as UserAttributes;
}
