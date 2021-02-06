import { usersStorageService } from '@root/storage';

import { UserAttributes } from '@root/lib/db/models/user';

import { GetUserByEmailParams, User } from './types';

export async function getUserByEmail(data: GetUserByEmailParams): Promise<User | null> {
  const { email } = data;

  const user = await usersStorageService.findOneByFilter({ email });
  if (!user) {
    return null;
  }

  return user.toJSON() as UserAttributes;
}
