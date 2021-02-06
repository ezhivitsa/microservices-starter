import { usersStorageService } from '@root/storage';

import { UserRole } from '@root/lib/db/models/enums';
import { UserAttributes } from '@root/lib/db/models/user';
import { generateSecureToken } from '@root/lib/secure';

import { DuplicateEmailError } from '@root/services/errors';

import { generatePasswordHast } from './utils';
import { RegisterParams, User } from './types';

export async function register(data: RegisterParams): Promise<User> {
  const { email, password, owner } = data;
  const roles = owner ? [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] : [UserRole.User];

  const usersWithEmail = await usersStorageService.findByFilter({ email });
  if (usersWithEmail.length) {
    throw new DuplicateEmailError();
  }

  const { hash, salt } = await generatePasswordHast(password);
  const signupToken = generateSecureToken();

  const user = await usersStorageService.create({
    email,
    passwordHash: hash,
    passwordSalt: salt,
    roles,
    signupToken,
  });
  return user.toJSON() as UserAttributes;
}
