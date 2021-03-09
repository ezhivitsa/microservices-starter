import { AppointmentTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { UpdateAppointmentParams } from '../types';

export function mapUpdateAppointmentDataToProto(
  data: UpdateAppointmentParams,
): AppointmentTypes.UpdateAppointmentRequest {
  const { end, start, ...restParams } = data;

  return {
    ...restParams,
    start: castDateToTimestamp(start),
    end: castDateToTimestamp(end),
  };
}
