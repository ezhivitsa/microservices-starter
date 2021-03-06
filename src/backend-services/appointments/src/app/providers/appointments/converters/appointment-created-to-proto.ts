import { AppointmentTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { AppointmentCreatedData } from '../types';

export function mapAppointmentCreatedToProto(
  id: string,
  data: AppointmentCreatedData,
): AppointmentTypes.AppointmentCreatedData {
  const { start, end, ...restData } = data;

  return {
    id,
    start: castDateToTimestamp(start),
    end: castDateToTimestamp(end),
    ...restData,
  };
}
