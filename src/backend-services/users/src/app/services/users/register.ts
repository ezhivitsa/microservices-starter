import { usersStorageService } from '@root/storage';
import { UsersProvider } from '@root/providers';

import { DuplicateAuthIdError } from '@root/services/errors';

import { RegisterParams, Metadata } from './types';

export async function register(data: RegisterParams, meta: Metadata): Promise<void> {
  const { authId, email, firstName, lastName } = data;

  const usersWithAuthId = await usersStorageService.findByFilter({ authId });
  if (usersWithAuthId.length) {
    throw new DuplicateAuthIdError();
  }

  const user = await usersStorageService.create({
    authId,
    email,
    firstName: firstName || null,
    lastName,
  });

  UsersProvider.sendCreatedEvent(
    user.id,
    {
      email,
      firstName: firstName || undefined,
      lastName,
    },
    {
      createdAt: new Date(),
      userId: meta.user?.id,
    },
  );
}
