import { AppointmentEvent } from '@packages/communication';

import { generateId } from '@root/lib/db/utils';

import { appointmentsAggregateService } from '@root/storage';

import { validateAccess } from './validators';
import { getEventMetadata } from './utils';
import { CreateAppointmentParams, Metadata, AppointmentCreatedData, AggregateEvent } from './types';

export async function createAppointment(params: CreateAppointmentParams, meta: Metadata): Promise<string> {
  validateAccess(meta.user, params.userId);

  const id = generateId();
  const event: AggregateEvent<AppointmentCreatedData> = {
    aggregateId: id,
    metadata: getEventMetadata(meta),
    type: AppointmentEvent.AppointmentCreated,
    data: params,
  };
  await appointmentsAggregateService.saveEvent(event);

  return id;
}
