import { castTimestampToDate } from '@packages/proto';

import { CreateAppointmentParams } from '@root/services/appointments/types';

import { CreateAppointmentRequest } from '../types';

export function mapCreateAppointmentToClient(params: CreateAppointmentRequest): CreateAppointmentParams {
  const { userId, start, end, description } = params;

  return {
    userId,
    start: castTimestampToDate(start),
    end: castTimestampToDate(end),
    description,
  };
}
