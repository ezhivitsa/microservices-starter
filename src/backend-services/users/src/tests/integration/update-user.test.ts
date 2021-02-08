import { cleanDB } from '../utils/db-utils';

import { registerUser } from '../fixtures/users';
import { updateUser } from '../commands';

describe('command /v1/update-user', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully update user', async () => {
    const user = await registerUser();

    const firstName = 'Updated';
    const response = await updateUser({
      id: user?.id,
      firstName,
      lastName: user?.lastName,
    });

    expect(response?.user?.firstName).toEqual(firstName);
  });
});
