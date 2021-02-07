import { cleanDB } from '../utils/db-utils';

import { registerUser } from '../fixtures/users';
import { getUser } from '../commands';

describe('command /v1/get-user', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully return user by email and password', async () => {
    const email = 'user@test.com';
    const password = '4123';
    await registerUser({ email, password });

    const response = await getUser({
      email,
      password,
    });

    expect(response.user?.email).toEqual(email);
  });
});
