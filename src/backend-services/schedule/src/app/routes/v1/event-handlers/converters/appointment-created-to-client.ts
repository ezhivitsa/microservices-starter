import { AppointmentTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { AppointmentsServiceTypes } from '@root/services';

export function mapAppointmentCreatedToClient(
  data: AppointmentTypes.AppointmentCreatedData,
): AppointmentsServiceTypes.CreateAppointmentParams | null {
  const { id, start, end, description, userId } = data;
  if (!id || !start || !end || !userId) {
    return null;
  }

  return {
    id,
    start: castTimestampToDate(start),
    end: castTimestampToDate(end),
    description,
    userId,
  };
}
