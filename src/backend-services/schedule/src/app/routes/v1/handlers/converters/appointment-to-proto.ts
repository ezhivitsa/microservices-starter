import { ScheduleTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { ScheduleServiceTypes } from '@root/services';

export function mapAppointmentToProto(
  appointment: ScheduleServiceTypes.ScheduleAppointment,
): ScheduleTypes.Appointment {
  const { id, start, end, description, user } = appointment;

  return {
    id,
    start: castDateToTimestamp(start),
    end: castDateToTimestamp(end),
    description,
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}
