import { usersStorageService } from 'storage';

import { DUPLICATE_AUTH_ID } from 'constants/error-constants';

import { ValidationError } from 'services/errors';

import { RegisterParams } from './types';

export async function register(data: RegisterParams): Promise<void> {
  const { authId, email, firstName, lastName } = data;

  const usersWithAuthId = await usersStorageService.findByFilter({ authId });
  if (usersWithAuthId.length) {
    throw new ValidationError({ email: { text: 'User with such authId is already exists', type: DUPLICATE_AUTH_ID } });
  }

  await usersStorageService.create({
    authId,
    email,
    firstName: firstName || null,
    lastName,
  });
}
