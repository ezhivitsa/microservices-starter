import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AppointmentCommand } from '@packages/communication';

import { createAppointmentHandler } from './handlers';
import { createAppointmentSchema } from './validators';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app.handleCommand({
    version: Version.v1,
    command: AppointmentCommand.CreateAppointment,
    schema: createAppointmentSchema,
    handler: createAppointmentHandler,
    validateUniq: true,
  });
}
