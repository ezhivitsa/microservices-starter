import { AppointmentsProvider } from 'providers';
import { ApiError } from 'errors';

import { ServiceMetadata } from '../types';

import { CreateAppointmentParams, UpdateAppointmentParams, DeleteAppointmentParams } from './types';

export async function createAppointment(params: CreateAppointmentParams, metadata: ServiceMetadata): Promise<string> {
  const id = await AppointmentsProvider.createAppointment(params, metadata);
  if (!id) {
    throw new ApiError();
  }

  return id;
}

export function updateAppointment(params: UpdateAppointmentParams, metadata: ServiceMetadata): Promise<void> {
  return AppointmentsProvider.updateAppointment(params, metadata);
}

export function deleteAppointment(params: DeleteAppointmentParams, metadata: ServiceMetadata): Promise<void> {
  return AppointmentsProvider.deleteAppointment(params, metadata);
}
