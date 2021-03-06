import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

import { mapUpdateAppointmentToClient } from '../converters';
import { UpdateAppointmentRequest } from '../types';

export async function updateAppointmentHandler(ctx: AppContext): Promise<void> {
  const data: UpdateAppointmentRequest = ctx.data;

  await AppointmentsService.updateAppointment(mapUpdateAppointmentToClient(data), {
    user: ctx.user,
  });

  ctx.body = null;
}
