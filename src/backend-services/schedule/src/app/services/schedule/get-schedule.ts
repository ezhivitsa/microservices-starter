import { appointmentsStorageService } from '@root/storage';

import { GetScheduleParams, ScheduleAppointment } from './types';

export async function getSchedule(params: GetScheduleParams): Promise<ScheduleAppointment[]> {
  const appointments = await appointmentsStorageService.findByFilter({
    from: params.from,
    to: params.to,
    withUser: true,
  });

  return appointments.map((appointment) => {
    const user = appointment.user;

    return {
      id: appointment.id,
      start: appointment.start,
      end: appointment.end,
      description: appointment.description || undefined,
      user: {
        id: user.id,
        firstName: user.firstName || undefined,
        lastName: user.lastName,
      },
    };
  });
}
