import { usersStorageService } from 'storage';

import { compareTextWithHash } from 'lib/secure';
import { UserAttributes } from 'lib/db/models/user';

import { GetUserParams, User } from './types';

export async function getUser(data: GetUserParams): Promise<User | null> {
  const { email, password } = data;

  const user = await usersStorageService.findOneByFilter({ email });
  if (!user) {
    return null;
  }

  const isPasswordMatch = await compareTextWithHash(password, user.passwordHash, user.passwordSalt);
  return isPasswordMatch ? (user.toJSON() as UserAttributes) : null;
}
