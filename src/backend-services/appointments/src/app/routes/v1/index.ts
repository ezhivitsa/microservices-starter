import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { AppointmentCommand } from '@packages/communication';

import { createAppointmentHandler, updateAppointmentHandler, deleteAppointmentHandler } from './handlers';

import { createAppointmentSchema, updateAppointmentSchema, deleteAppointmentSchema } from './validators';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app
    .handleCommand({
      version: Version.v1,
      command: AppointmentCommand.CreateAppointment,
      schema: createAppointmentSchema,
      handler: createAppointmentHandler,
      validateUniq: true,
    })
    .handleCommand({
      version: Version.v1,
      command: AppointmentCommand.UpdateAppointment,
      schema: updateAppointmentSchema,
      handler: updateAppointmentHandler,
      validateUniq: true,
    })
    .handleCommand({
      version: Version.v1,
      command: AppointmentCommand.DeleteAppointment,
      schema: deleteAppointmentSchema,
      handler: deleteAppointmentHandler,
      validateUniq: true,
    });
}
