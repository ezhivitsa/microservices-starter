import { AppointmentTypes } from '@packages/communication';
import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

import { mapCreateAppointmentToClient } from '../converters';
import { CreateAppointmentRequest } from '../types';

export async function createAppointmentHandler(ctx: AppContext): Promise<void> {
  const data: CreateAppointmentRequest = ctx.data;
  const id = await AppointmentsService.createAppointment(mapCreateAppointmentToClient(data), {
    user: ctx.user,
  });

  const response: AppointmentTypes.CreateAppointmentResponse = {
    id,
  };
  ctx.body = response;
}
