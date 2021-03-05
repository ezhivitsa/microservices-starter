import { appointmentsClient } from '@root/lib/clients';

import { ProviderTypes } from '@root/providers';

import { mapUserDataToClient } from './converters';

import { AppointmentCreatedData, AppointmentUpdatedData, AppointmentDeletedData } from './types';

export function sendCreatedEvent(data: AppointmentCreatedData, metadata: ProviderTypes.EventMetadata): void {
  appointmentsClient.appointmentCreatedEvent(data, metadata);
}

export async function sendUpdatedEvent(params: AppointmentUpdatedData, metadata: ProviderTypes.EventMetadata): Promise<void> {
  const { user } = await usersClient.getUserByAuthIdCommand(params, mapMetadataToProto(metadata));
  return user ? mapUserDataToClient(user) : null;
}

export async function SendDeletedEvent(params: AppointmentDeletedData, metadata: ProviderTypes.EventMetadata): void {
  const { user } = await usersClient.updateUserCommand(params, mapMetadataToProto(metadata));
  return user ? mapUserDataToClient(user) : null;
}Promise<void>
