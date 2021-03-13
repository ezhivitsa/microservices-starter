import { AppointmentTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

export async function appointmentDeletedHandler(ctx: AppContext): Promise<void> {
  const event: AppointmentTypes.AppointmentDeletedEvent = ctx.data;

  const { id } = event.data || {};
  if (id) {
    await AppointmentsService.deleteAppointment({ id });
  }
}
