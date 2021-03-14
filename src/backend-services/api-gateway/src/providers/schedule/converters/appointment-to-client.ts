import { ScheduleTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { ScheduleAppointment } from '../types';

export function mapAppointmentToClient(appointment: ScheduleTypes.Appointment): ScheduleAppointment | null {
  const { id, start, end, description, userId, firstName, lastName } = appointment;

  if (!id || !start || !end || !userId || !lastName) {
    return null;
  }

  return {
    id,
    start: castTimestampToDate(start),
    end: castTimestampToDate(end),
    description,
    userId,
    firstName,
    lastName,
  };
}
