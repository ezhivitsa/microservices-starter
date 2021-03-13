import { KoaKafka, Version, AppState, AppContext } from '@packages/koa-kafka';
import { UserEvent, AppointmentEvent, ScheduleCommand, Channel } from '@packages/communication';

import { getScheduleSchema } from './validators';
import { getScheduleHandler } from './handlers';
import {
  appointmentCreatedHandler,
  appointmentUpdatedHandler,
  appointmentDeletedHandler,
  userCreatedHandler,
  userUpdatedHandler,
} from './event-handlers';

export function initV1Routes(app: KoaKafka<AppState, AppContext>): void {
  app
    .handleEvent({
      version: Version.v1,
      event: AppointmentEvent.AppointmentCreated,
      channel: Channel.Appointments,
      handler: appointmentCreatedHandler,
    })
    .handleEvent({
      version: Version.v1,
      event: AppointmentEvent.AppointmentUpdated,
      channel: Channel.Appointments,
      handler: appointmentUpdatedHandler,
    })
    .handleEvent({
      version: Version.v1,
      event: AppointmentEvent.AppointmentDeleted,
      channel: Channel.Appointments,
      handler: appointmentDeletedHandler,
    })

    .handleEvent({
      version: Version.v1,
      event: UserEvent.UserCreated,
      channel: Channel.Users,
      handler: userCreatedHandler,
    })
    .handleEvent({
      version: Version.v1,
      event: UserEvent.UserUpdated,
      channel: Channel.Users,
      handler: userUpdatedHandler,
    })

    .handleCommand({
      version: Version.v1,
      command: ScheduleCommand.GetSchedule,
      schema: getScheduleSchema,
      handler: getScheduleHandler,
    });
}
