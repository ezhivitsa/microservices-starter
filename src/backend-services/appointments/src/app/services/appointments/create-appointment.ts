import { AppointmentEvent } from '@packages/communication';

import { generateId } from '@root/lib/db/utils';

import { appointmentsAggregateService } from '@root/storage';

import { validateAccess } from './validators';
import { getEventMetadata } from './utils';
import { CreateAppointmentParams, Metadata, AppointmentUpdatedData, AggregateEvent } from './types';

export async function createAppointment(params: CreateAppointmentParams, meta: Metadata): Promise<string> {
  validateAccess(meta.user, params.userId);

  const id = generateId();
  const event: AggregateEvent<AppointmentUpdatedData> = {
    aggregateId: id,
    metadata: getEventMetadata(meta),
    type: AppointmentEvent.AppointmentCreated,
    data: params,
  };
  await appointmentsAggregateService.saveEvent(event);

  return id;
}
