import { usersStorageService } from '@root/storage';

import { User } from './types';

export async function getUsers(): Promise<User[]> {
  const users = await usersStorageService.findByFilter({});

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName || undefined,
    lastName: user.lastName,
  }));
}
