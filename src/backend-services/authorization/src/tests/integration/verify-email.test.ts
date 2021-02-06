import '../../app/boot';

import { cleanDB } from '../utils/db-utils';

import { registerUser, getUserById } from '../fixtures/users';

import { verifyEmail } from '../commands';

describe('command /v1/verify-email', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully register user', async () => {
    const user = await registerUser();

    await verifyEmail({
      token: user.signupToken,
    });

    const updatedUser = await getUserById(user.id);
    expect(updatedUser?.isEmailVerified).toBeTruthy();
  });
});
