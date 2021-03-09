import { RouterAppContext } from 'koa';

import { AppointmentsService } from 'services';

export async function deleteAppointmentHandler(ctx: RouterAppContext): Promise<void> {
  await AppointmentsService.deleteAppointment(
    {
      id: ctx.params.appointmentId,
    },
    ctx.state,
  );

  ctx.body = null;
}
