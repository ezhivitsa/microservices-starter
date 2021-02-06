import '../../app/boot';

import { cleanDB } from '../utils/db-utils';

import { register } from '../commands';

describe('command /v1/register', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully register user', async () => {
    const response = await register({
      email: 'test@test.com',
      password: 'qwerty',
      owner: true,
    });

    expect(response.id).toBeDefined();
  });
});
