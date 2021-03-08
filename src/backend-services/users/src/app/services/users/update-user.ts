import { usersStorageService } from '@root/storage';
import { UsersProvider } from '@root/providers';

import { NotFoundError } from '@root/services/errors';

import { validateAccess } from './validators';
import { UpdateUserParams, User, Metadata } from './types';

export async function updateUser(data: UpdateUserParams, meta: Metadata): Promise<User | null> {
  const { id, firstName, lastName } = data;

  validateAccess(meta.user, id);

  const user = await usersStorageService.findByIdAndUpdate(id, {
    firstName: firstName || null,
    lastName,
  });
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  UsersProvider.sendUpdatedEvent(
    id,
    {
      email: user.email,
      firstName: user.firstName || undefined,
      lastName: user.lastName,
    },
    {
      createdAt: new Date(),
      userId: meta.user?.id,
    },
  );

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || undefined,
    lastName: user.lastName,
  };
}
