import { AppointmentTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { AppointmentUpdatedData } from '../types';

export function mapAppointmentUpdatedToProto(
  id: string,
  data: AppointmentUpdatedData,
): AppointmentTypes.AppointmentUpdatedData {
  const { start, end, ...restData } = data;

  return {
    id,
    start: castDateToTimestamp(start),
    end: castDateToTimestamp(end),
    ...restData,
  };
}
