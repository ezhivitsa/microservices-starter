import { generateSecureToken } from '@root/lib/secure';

import { usersStorageService } from '@root/storage';

import { NotFoundError } from '../errors';
import { GetForgotPasswordTokenParams, GetForgotPasswordTokenResult } from './types';

export async function getForgotPasswordToken(
  data: GetForgotPasswordTokenParams,
): Promise<GetForgotPasswordTokenResult> {
  const user = await usersStorageService.findOneByFilter({ email: data.email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.resetPasswordToken) {
    return {
      id: user.id,
      token: user.resetPasswordToken,
    };
  }

  const resetPasswordToken = generateSecureToken();

  await usersStorageService.findByIdAndUpdate(user.id, {
    resetPasswordToken,
  });

  return {
    id: user.id,
    token: resetPasswordToken,
  };
}
