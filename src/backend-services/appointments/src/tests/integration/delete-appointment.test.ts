import { cleanDB } from '../utils/db-utils';
import { getAppointmentData, createAppointment } from '../fixtures/appointments';

import { deleteAppointmentCommand } from '../commands';

describe('command /v1/delete-appointment', () => {
  beforeAll(async () => {
    await cleanDB();
  });

  it('should successfully delete appointment', async () => {
    const appointmentId = await createAppointment({});

    await deleteAppointmentCommand({
      id: appointmentId,
    });

    const appointment = await getAppointmentData(appointmentId);

    expect(appointment?.deleted).toEqual(true);
  });
});
