import { appointmentsClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { mapMetadataToProto } from '../converters';

import { mapCreateAppointmentDataToProto, mapUpdateAppointmentDataToProto } from './converters';
import { CreateAppointmentParams, UpdateAppointmentParams, DeleteAppointmentParams } from './types';

export async function createAppointment(
  params: CreateAppointmentParams,
  metadata: ProviderTypes.Metadata,
): Promise<string | null> {
  const { id } = await appointmentsClient.createAppointmentCommand(
    mapCreateAppointmentDataToProto(params),
    mapMetadataToProto(metadata),
  );

  return id || null;
}

export async function updateAppointment(
  params: UpdateAppointmentParams,
  metadata: ProviderTypes.Metadata,
): Promise<void> {
  await appointmentsClient.updateAppointmentCommand(
    mapUpdateAppointmentDataToProto(params),
    mapMetadataToProto(metadata),
  );
}

export async function deleteAppointment(
  params: DeleteAppointmentParams,
  metadata: ProviderTypes.Metadata,
): Promise<void> {
  await appointmentsClient.deleteAppointmentCommand(params, mapMetadataToProto(metadata));
}
