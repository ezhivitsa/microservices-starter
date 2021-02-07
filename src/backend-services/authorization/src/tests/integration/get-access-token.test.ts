import { cleanDB } from '../utils/db-utils';

import { createUserAndSaveToken } from '../fixtures/users';
import { getAccessToken } from '../commands';

describe('command /v1/get-access-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully return user token data', async () => {
    const accessToken = '123';

    const user = await createUserAndSaveToken({}, { accessToken });

    const response = await getAccessToken({
      accessToken,
    });

    expect(response.token?.user?.id).toEqual(user.id);
  });
});
