import { castDateToTimestamp } from '@packages/proto';

import { cleanDB } from '../utils/db-utils';
import { getTomorrow } from '../utils/date';

import { createUserAndSaveToken } from '../fixtures/users';
import { verifyScope } from '../commands';

describe('command /v1/verify-scope', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should get that scope is verified', async () => {
    const accessToken = '112233';
    const user = await createUserAndSaveToken({}, { accessToken });

    const tomorrow = getTomorrow();

    const response = await verifyScope({
      accessToken,
      accessTokenExpiresAt: castDateToTimestamp(tomorrow),
      user: {
        id: user.id,
      },
    });

    expect(response.verified).toBeTruthy();
  });
});
