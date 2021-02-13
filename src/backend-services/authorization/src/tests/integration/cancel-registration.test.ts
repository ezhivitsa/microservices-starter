import { cleanDB } from '../utils/db-utils';

import { registerUser, getUserById } from '../fixtures/users';
import { cancelRegistration } from '../commands';

describe('command /v1/cancel-registration', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully delete user', async () => {
    const user = await registerUser();

    await cancelRegistration({
      id: user.id,
    });

    const userById = await getUserById(user.id);
    expect(userById).toBeNull();
  });
});
