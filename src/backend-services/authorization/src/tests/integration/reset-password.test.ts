import { cleanDB } from '../utils/db-utils';

import { registerUser, getResetPasswordToken, getUserById } from '../fixtures/users';
import { resetPassword } from '../commands';

describe('command /v1/reset-password', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully reset password', async () => {
    const user = await registerUser();
    const tokenData = await getResetPasswordToken(user.email);

    await resetPassword({
      token: tokenData.token,
      password: '123',
    });

    const updatedUser = await getUserById(user.id);
    expect(updatedUser?.resetPasswordToken).toEqual(null);
  });
});
