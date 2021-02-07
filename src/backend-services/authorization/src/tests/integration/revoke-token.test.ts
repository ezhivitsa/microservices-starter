import { cleanDB } from '../utils/db-utils';

import { createUserAndSaveToken, getAccessToken } from '../fixtures/users';
import { revokeToken } from '../commands';

describe('command /v1/revoke-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully revoke user tokens', async () => {
    const accessToken = '782';
    const refreshToken = '990';
    const user = await createUserAndSaveToken({}, { accessToken, refreshToken });

    await revokeToken({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
      },
    });

    const token = await getAccessToken(accessToken);
    expect(token).toBeNull();
  });
});
