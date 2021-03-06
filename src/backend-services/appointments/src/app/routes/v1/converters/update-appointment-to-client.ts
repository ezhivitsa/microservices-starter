import { castTimestampToDate } from '@packages/proto';

import { UpdateAppointmentParams } from '@root/services/appointments/types';

import { UpdateAppointmentRequest } from '../types';

export function mapUpdateAppointmentToClient(params: UpdateAppointmentRequest): UpdateAppointmentParams {
  const { id, start, end, description } = params;

  return {
    id,
    start: castTimestampToDate(start),
    end: castTimestampToDate(end),
    description,
  };
}
