import { cleanDB } from '../utils/db-utils';

import { getUserByAuthId } from '../fixtures/users';
import { register } from '../commands';

describe('command /v1/register', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully register user', async () => {
    const authId = '321';
    const email = 'user@test.com';

    await register({
      email,
      authId,
      firstName: 'Test',
      lastName: 'User',
    });

    const user = await getUserByAuthId(authId);
    expect(user?.email).toEqual(email);
  });
});
