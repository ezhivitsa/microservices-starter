import { AppContext } from '@packages/koa-kafka';

import { AppointmentsService } from '@root/services';

import { DeleteAppointmentRequest } from '../types';

export async function deleteAppointmentHandler(ctx: AppContext): Promise<void> {
  const data: DeleteAppointmentRequest = ctx.data;

  await AppointmentsService.deleteAppointment(data, {
    user: ctx.user,
  });

  ctx.body = null;
}
