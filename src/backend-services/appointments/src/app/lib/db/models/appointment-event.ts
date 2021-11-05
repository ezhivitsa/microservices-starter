import { Connection } from '@packages/mongo-storage';
import { eventSchema, EventModel, EventDocument } from '@packages/event-sourcing';

export function initAppointmentEvent(mongo: Connection): EventModel {
  return mongo.model<EventDocument>('appointment-events', eventSchema);
}
