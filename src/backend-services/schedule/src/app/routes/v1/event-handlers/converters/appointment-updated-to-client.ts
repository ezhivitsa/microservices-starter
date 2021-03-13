import { AppointmentTypes } from '@packages/communication';
import { castTimestampToDate } from '@packages/proto';

import { AppointmentsServiceTypes } from '@root/services';

export function mapAppointmentUpdatedToClient(
  data: AppointmentTypes.AppointmentUpdatedData,
): AppointmentsServiceTypes.UpdateAppointmentParams | null {
  const { id, start, end, description } = data;
  if (!id || !start || !end) {
    return null;
  }

  return {
    id,
    start: castTimestampToDate(start),
    end: castTimestampToDate(end),
    description,
  };
}
