import { usersStorageService } from 'storage';
import { UserRole } from 'lib/db/models/enums';

import { getHash, generateSalt } from 'lib/secure';

import { RegisterParams } from './types';

export async function register(data: RegisterParams): Promise<void> {
  const { email, password, owner } = data;
  const roles = owner ? [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] : [UserRole.User];

  const salt = await generateSalt();
  const hash = await getHash(password, salt);

  await usersStorageService.create({
    email,
    passwordHash: hash,
    passwordSalt: salt,
    roles,
  });
}
