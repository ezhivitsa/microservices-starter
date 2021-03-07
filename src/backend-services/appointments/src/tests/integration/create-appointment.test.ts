import { castDateToTimestamp } from '@packages/proto';

import { cleanDB } from '../utils/db-utils';
import { getAppointmentData } from '../fixtures/appointments';

import { createAppointment } from '../commands';

describe('command /v1/create-appointment', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully create appointment', async () => {
    const userId = '111';
    const response = await createAppointment({
      userId,
      start: castDateToTimestamp(new Date()),
      end: castDateToTimestamp(new Date()),
      description: 'description',
    });

    const appointment = await getAppointmentData(response.id);

    expect(appointment?.userId).toEqual(userId);
  });
});
