import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AppointmentsService } from 'services';

import { mapAppointmentToFront } from './converters';

export async function getAppointmentsHandler(ctx: RouterAppContext): Promise<void> {
  const data: ServiceTypes.GetAppointmentsRequest = ctx.state.validatedRequest.value;

  const appointments = await AppointmentsService.getAppointments(
    {
      from: new Date(data.from),
      to: new Date(data.to),
    },
    ctx.state,
  );

  const response: ServiceTypes.GetAppointmentsResponse = {
    appointments: appointments.map(mapAppointmentToFront),
  };
  ctx.body = response;
}
