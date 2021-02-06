import { usersStorageService } from '@root/storage';

import { NotFoundError } from '../errors';

import { VerifyEmailParams } from './types';

export async function verifyEmail(data: VerifyEmailParams): Promise<void> {
  const user = await usersStorageService.findOneByFilter({ signupToken: data.token });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  await usersStorageService.findByIdAndUpdate(user.id, {
    isEmailVerified: true,
  });
}
