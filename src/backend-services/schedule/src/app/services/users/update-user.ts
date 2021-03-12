import { usersStorageService } from '@root/storage';

import { UpdateUserParams } from './types';

export async function updateUser(params: UpdateUserParams): Promise<void> {
  await usersStorageService.findByIdAndUpdate(params.id, {
    firstName: params.firstName || null,
    lastName: params.lastName,
    email: params.email,
  });
}
