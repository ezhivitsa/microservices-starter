import { AppointmentTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

import { mapAppointmentCreatedToClient } from './converters';

export async function appointmentCreatedHandler(ctx: AppContext): Promise<void> {
  const event: AppointmentTypes.AppointmentCreatedEvent = ctx.data;

  const data = mapAppointmentCreatedToClient(event.data || {});
  if (data) {
    await AppointmentsService.createAppointment(data);
  }
}
