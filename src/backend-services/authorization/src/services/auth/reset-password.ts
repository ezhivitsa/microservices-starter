import { usersStorageService } from 'storage';

import { NotFoundError } from '../errors';
import { generatePasswordHast } from './utils';
import { ResetPasswordParams } from './types';

export async function resetPassword(data: ResetPasswordParams): Promise<void> {
  const user = await usersStorageService.findOneByFilter({ resetPasswordToken: data.token });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const { hash, salt } = await generatePasswordHast(data.password);

  await usersStorageService.findByIdAndUpdate(user.id, {
    passwordHash: hash,
    passwordSalt: salt,
    resetPasswordToken: null,
  });
}
