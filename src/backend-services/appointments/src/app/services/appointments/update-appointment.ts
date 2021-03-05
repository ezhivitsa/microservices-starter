import { AppointmentEvent } from '@packages/communication';

import { appointmentsAggregateService } from '@root/storage';

import { validateAccess, validateAppointmentActive } from './validators';
import { getEventMetadata } from './utils';
import { UpdateAppointmentParams, Metadata, AggregateEvent, AppointmentUpdatedData } from './types';

export async function updateAppointment(params: UpdateAppointmentParams, meta: Metadata): Promise<void> {
  let appointment = await appointmentsAggregateService.findById(params.id);

  appointment = validateAppointmentActive(appointment);
  validateAccess(meta.user, appointment.userId);

  const event: AggregateEvent<AppointmentUpdatedData> = {
    aggregateId: appointment._id,
    metadata: getEventMetadata(meta),
    type: AppointmentEvent.AppointmentUpdated,
    data: params,
  };
  await appointmentsAggregateService.saveEvent(event);
}
