import { RouterAppContext } from 'koa';

import { ServiceTypes } from '@packages/common';

import { AppointmentsService } from 'services';

import { GetAppointmentsQueryParams } from '../types';
import { mapAppointmentToFront } from './converters';

export async function getAppointmentsHandler(ctx: RouterAppContext): Promise<void> {
  const data: GetAppointmentsQueryParams = ctx.state.validatedRequest.value;

  const appointments = await AppointmentsService.getAppointments(data, ctx.state);

  const response: ServiceTypes.GetAppointmentsResponse = {
    appointments: appointments.map(mapAppointmentToFront),
  };
  ctx.body = response;
}
