import { AppointmentTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { CreateAppointmentParams } from '../types';

export function mapCreateAppointmentDataToProto(
  data: CreateAppointmentParams,
): AppointmentTypes.CreateAppointmentRequest {
  const { end, start, ...restParams } = data;

  return {
    ...restParams,
    start: castDateToTimestamp(start),
    end: castDateToTimestamp(end),
  };
}
