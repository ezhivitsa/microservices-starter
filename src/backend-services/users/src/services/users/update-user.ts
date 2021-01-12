import { usersStorageService } from 'storage';

import { NotFoundError } from 'services/errors';

import { UpdateUserParams, User } from './types';

export async function updateUser(data: UpdateUserParams): Promise<User | null> {
  const { id, firstName, lastName } = data;

  const user = await usersStorageService.findByIdAndUpdate(id, {
    firstName: firstName || null,
    lastName,
  });
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || undefined,
    lastName: user.lastName,
  };
}
