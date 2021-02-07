import { cleanDB } from '../utils/db-utils';

import { createUserAndSaveToken } from '../fixtures/users';
import { getRefreshToken } from '../commands';

describe('command /v1/get-refresh-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully return user token data', async () => {
    const refreshToken = '1230';

    const user = await createUserAndSaveToken({}, { refreshToken });

    const response = await getRefreshToken({
      refreshToken,
    });

    expect(response.token?.user?.id).toEqual(user.id);
  });
});
