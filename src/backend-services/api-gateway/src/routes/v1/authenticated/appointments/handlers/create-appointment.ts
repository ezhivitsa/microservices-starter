import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AppointmentsService } from 'services';

export async function createAppointmentHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.CreateAppointmentRequest = ctx.state.validatedRequest.value;

  const id = await AppointmentsService.createAppointment(
    {
      ...data,
      start: new Date(data.start),
      end: new Date(data.end),
    },
    ctx.state,
  );

  const response: ServiceTypes.CreateAppointmentResponse = {
    id,
  };
  ctx.body = response;
}
