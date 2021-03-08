import { castDateToTimestamp } from '@packages/proto';

import { cleanDB } from '../utils/db-utils';
import { getAppointmentData, createAppointment } from '../fixtures/appointments';

import { updateAppointmentCommand } from '../commands';

describe('command /v1/update-appointment', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully update appointment', async () => {
    const appointmentId = await createAppointment({});

    const description = 'updated description';

    await updateAppointmentCommand({
      id: appointmentId,
      start: castDateToTimestamp(new Date()),
      end: castDateToTimestamp(new Date()),
      description,
    });

    const appointment = await getAppointmentData(appointmentId);

    expect(appointment?.description).toEqual(description);
  });
});
