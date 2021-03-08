import * as AppointmentSchemas from './schemas';

import { getChannelEvents, ChannelEventSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AppointmentEvent {
  AppointmentCreated = 'appointment-created',
  AppointmentUpdated = 'appointment-updated',
  AppointmentDeleted = 'appointment-deleted',
}

export const appointmentEventSchemas: Record<string, ChannelEventSchema> = getChannelEvents(
  Channel.APPOINTMENTS,
  [
    {
      event: AppointmentEvent.AppointmentCreated,
      schema: AppointmentSchemas.appointmentCreatedEvent,
    },
    {
      event: AppointmentEvent.AppointmentUpdated,
      schema: AppointmentSchemas.appointmentUpdatedEvent,
    },
    {
      event: AppointmentEvent.AppointmentDeleted,
      schema: AppointmentSchemas.appointmentDeletedEvent,
    },
  ],
  Version.v1,
);
