import { usersStorageService } from 'storage';

import { UserRole } from 'lib/db/models/enums';
import { UserAttributes } from 'lib/db/models/user';
import { getHash, generateSalt, generateSecureToken } from 'lib/secure';

import { DuplicateEmailError } from 'services/errors';

import { RegisterParams, User } from './types';

export async function register(data: RegisterParams): Promise<User> {
  const { email, password, owner } = data;
  const roles = owner ? [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] : [UserRole.User];

  const usersWithEmail = await usersStorageService.findByFilter({ email });
  if (usersWithEmail.length) {
    throw new DuplicateEmailError();
  }

  const salt = await generateSalt();
  const hash = await getHash(password, salt);
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
