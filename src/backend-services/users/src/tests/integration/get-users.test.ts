import { cleanDB } from '../utils/db-utils';

import { registerUser } from '../fixtures/users';
import { getUsers } from '../commands';

describe('command /v1/get-users', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully get list of users', async () => {
    const authId1 = '3216';
    const authId2 = '36';

    const [user1, user2] = await Promise.all([registerUser({ authId: authId1 }), registerUser({ authId: authId2 })]);

    const response = await getUsers();
    const userIds = response.users.map(({ id }) => id);

    expect(userIds).toContain(user1?.id);
    expect(userIds).toContain(user2?.id);
  });
});
