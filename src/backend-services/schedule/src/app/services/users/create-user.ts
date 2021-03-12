import { usersStorageService } from '@root/storage';

import { CreateUserParams } from './types';

export async function createUser(params: CreateUserParams): Promise<void> {
  await usersStorageService.create({
    id: params.id,
    firstName: params.firstName || null,
    lastName: params.lastName,
    email: params.email,
  });
}
