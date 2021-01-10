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
    ...user,
    firstName: user.firstName || undefined,
  };
}
