import { AppContext } from '@packages/koa-kafka';

import { mapCreateAppointmentToClient } from '../converters';
import { CreateAppointmentRequest } from '../types';

export async function createAppointmentHandler(ctx: AppContext): Promise<void> {
  const data: CreateAppointmentRequest = ctx.data;
  const id = await AuthService.getAccessToken(data);

  ctx.body = mapAccessTokenDataToProto(token);
}
