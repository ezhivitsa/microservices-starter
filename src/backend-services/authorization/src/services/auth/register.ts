import { usersStorageService } from 'storage';
import { UserRole } from 'lib/db/models/enums';

import { getHash, generateSalt } from 'lib/secure';

import { ValidationError } from 'services/errors';

import { RegisterParams } from './types';

export async function register(data: RegisterParams): Promise<void> {
  const { email, password, owner } = data;
  const roles = owner ? [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] : [UserRole.User];

  const userWithEmail = await usersStorageService.findByFilter({ email });
  if (userWithEmail) {
    throw new ValidationError({ email: { text: 'User with such email already exist', type: 'DUPLICATE_EMAIL' } });
  }

  const salt = await generateSalt();
  const hash = await getHash(password, salt);

  await usersStorageService.create({
    email,
    passwordHash: hash,
    passwordSalt: salt,
    roles,
  });
}