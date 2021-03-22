import { usersStorageService } from '@root/storage';

import { DeleteUserParams } from './types';

export async function deleteUser(data: DeleteUserParams): Promise<void> {
  await usersStorageService.deleteById(data.id);
}
