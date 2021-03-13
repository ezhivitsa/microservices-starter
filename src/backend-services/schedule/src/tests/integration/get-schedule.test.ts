import { castDateToTimestamp } from '@packages/proto';

import { cleanDB } from '../utils/db-utils';
import { getTomorrow, startOfTomorrow, endOfTomorrow } from '../utils/date';

import { createAppointment } from '../fixtures/appointments';
import { createUser } from '../fixtures/users';

import { getScheduleCommand } from '../commands';

describe('command /v1/get-schedule', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully get schedule', async () => {
    const userId = '111';
    const appointmentId = '123';

    const tomorrow = getTomorrow();

    await createUser({ id: userId });
    await createAppointment({ id: appointmentId, userId, start: tomorrow, end: tomorrow });

    const { appointments } = await getScheduleCommand({
      from: castDateToTimestamp(startOfTomorrow()),
      to: castDateToTimestamp(endOfTomorrow()),
    });

    expect(appointments?.length).toEqual(1);
    expect(appointments?.[0].id).toEqual(appointmentId);
  });
});
