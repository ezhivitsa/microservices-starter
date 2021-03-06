import { AppointmentEvent } from '@packages/communication';

import { AppointmentsProvider } from '@root/providers';
import { appointmentsAggregateService } from '@root/storage';

import { validateAccess, validateAppointmentActive } from './validators';
import { getEventMetadata } from './utils';
import { DeleteAppointmentParams, Metadata, AggregateEvent } from './types';

export async function deleteAppointment(params: DeleteAppointmentParams, meta: Metadata): Promise<void> {
  let appointment = await appointmentsAggregateService.findById(params.id);

  appointment = validateAppointmentActive(appointment);
  validateAccess(meta.user, appointment.userId);

  const event: AggregateEvent = {
    aggregateId: appointment._id,
    metadata: getEventMetadata(meta),
    type: AppointmentEvent.AppointmentDeleted,
  };
  await appointmentsAggregateService.saveEvent(event);
  AppointmentsProvider.sendDeletedEvent(appointment._id, event.metadata);
}
