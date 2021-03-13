import { AppContext } from '@packages/koa-kafka';
import { ScheduleTypes } from '@packages/communication';

import { ScheduleService } from '@root/services';

import { GetScheduleRequest } from '../types';
import { mapAppointmentToProto, mapGetScheduleToClient } from './converters';

export async function getScheduleHandler(ctx: AppContext): Promise<void> {
  const data: GetScheduleRequest = ctx.data;

  const appointments = await ScheduleService.getSchedule(mapGetScheduleToClient(data));

  const response: ScheduleTypes.GetScheduleResponse = {
    appointments: appointments.map(mapAppointmentToProto),
  };
  ctx.body = response;
}
