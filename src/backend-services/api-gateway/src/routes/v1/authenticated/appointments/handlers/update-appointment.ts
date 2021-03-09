import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AppointmentsService } from 'services';

export async function updateAppointmentHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.UpdateAppointmentRequest = ctx.state.validatedRequest.value;

  await AppointmentsService.updateAppointment(
    {
      id: ctx.params.appointmentId,
      start: new Date(data.start),
      end: new Date(data.end),
      description: data.description,
    },
    ctx.state,
  );

  ctx.body = null;
}
