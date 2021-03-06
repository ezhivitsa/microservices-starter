import { appointmentsClient } from '@root/lib/clients';

import { ProviderTypes } from '@root/providers';

import { mapEventMetadataToProto } from '../converters';

import { mapAppointmentCreatedToProto, mapAppointmentUpdatedToProto } from './converters';
import { AppointmentCreatedData, AppointmentUpdatedData } from './types';

export function sendCreatedEvent(
  aggregateId: string,
  data: AppointmentCreatedData,
  metadata: ProviderTypes.EventMetadata,
): void {
  appointmentsClient.appointmentCreatedEvent(
    mapAppointmentCreatedToProto(aggregateId, data),
    mapEventMetadataToProto(metadata),
  );
}

export function sendUpdatedEvent(
  aggregateId: string,
  data: AppointmentUpdatedData,
  metadata: ProviderTypes.EventMetadata,
): void {
  appointmentsClient.appointmentUpdatedEvent(
    mapAppointmentUpdatedToProto(aggregateId, data),
    mapEventMetadataToProto(metadata),
  );
}

export function sendDeletedEvent(aggregateId: string, metadata: ProviderTypes.EventMetadata): void {
  appointmentsClient.appointmentDeletedEvent({ id: aggregateId }, mapEventMetadataToProto(metadata));
}
