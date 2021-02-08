import { cleanDB } from '../utils/db-utils';

import { registerUser } from '../fixtures/users';
import { getUserByAuthId } from '../commands';

describe('command /v1/get-user-by-auth-id', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully return user by authId', async () => {
    const authId = '3216';
    const registeredUser = await registerUser({ authId });

    const response = await getUserByAuthId({
      authId,
    });

    expect(response.user?.id).toEqual(registeredUser?.id);
  });
});
