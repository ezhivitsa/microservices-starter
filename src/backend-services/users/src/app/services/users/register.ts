import { usersStorageService } from '@root/storage';

import { DuplicateAuthIdError } from '@root/services/errors';

import { RegisterParams } from './types';

export async function register(data: RegisterParams): Promise<void> {
  const { authId, email, firstName, lastName } = data;

  const usersWithAuthId = await usersStorageService.findByFilter({ authId });
  if (usersWithAuthId.length) {
    throw new DuplicateAuthIdError();
  }

  await usersStorageService.create({
    authId,
    email,
    firstName: firstName || null,
    lastName,
  });
}