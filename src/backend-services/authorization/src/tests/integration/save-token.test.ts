import { castDateToTimestamp } from '@packages/proto';

import { cleanDB } from '../utils/db-utils';
import { getTomorrow } from '../utils/date';

import { registerUser, getAccessToken } from '../fixtures/users';
import { saveToken } from '../commands';

describe('command /v1/revoke-token', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully reset password', async () => {
    const accessToken = '78290';
    const refreshToken = '54327';

    const tomorrow = getTomorrow();

    const user = await registerUser();

    await saveToken({
      accessToken,
      accessTokenExpiresAt: castDateToTimestamp(tomorrow),
      refreshToken,
      refreshTokenExpiresAt: castDateToTimestamp(tomorrow),
      user: {
        id: user.id,
      },
    });

    const token = await getAccessToken(accessToken);
    expect(token?.user.id).toEqual(user.id);
  });
});
