import { AppointmentTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

import { mapAppointmentUpdatedToClient } from './converters';

export async function appointmentUpdatedHandler(ctx: AppContext): Promise<void> {
  const event: AppointmentTypes.AppointmentUpdatedEvent = ctx.data;

  const data = mapAppointmentUpdatedToClient(event.data || {});
  if (data) {
    await AppointmentsService.updateAppointment(data);
  }
}
