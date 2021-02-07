import { cleanDB } from '../utils/db-utils';

import { registerUser } from '../fixtures/users';
import { getSignupToken } from '../commands';

describe('command /v1/get-signup-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully return user signup token', async () => {
    const email = 'user-email@test.com';
    const user = await registerUser({ email });

    const response = await getSignupToken({
      email: user.email,
    });

    expect(response.token).toEqual(user.signupToken);
  });
});
