import { cleanDB } from '../utils/db-utils';

import { registerUser, getUserById } from '../fixtures/users';
import { getForgotPasswordToken } from '../commands';

describe('command /v1/get-forgot-password-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully get forgot password token for user', async () => {
    const user = await registerUser();

    const response = await getForgotPasswordToken({
      email: user.email,
    });

    const updatedUser = await getUserById(user.id);
    expect(response.token).toEqual(updatedUser?.resetPasswordToken);
  });
});
