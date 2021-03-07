import mongoose, { Schema, Model, Document, Connection } from 'mongoose';

import { Event } from '@packages/communication';

export interface EventMetadata {
  createdAt: Date;
  userId?: string;
}

export interface DbEvent {
  createdAt: Date;
  type: Event;
  aggregateId: string;
  version: number;
  metadata: EventMetadata;
  data?: Record<string, any>;
}

export interface EventDocument extends DbEvent, Document<string> {
  id: string;
}

export type EventModel = Model<EventDocument>;

const eventSchema = new Schema<EventDocument, EventModel>({
  _id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  aggregateId: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  metadata: {
    createdAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
    },
  },
});

// export function initAppointmentEvent(mongo: Connection): EventModel {
//   return mongo.model<EventDocument>('Appointment-events', eventSchema);
// }

export function initAppointmentEvent(): EventModel {
  return mongoose.model<EventDocument>('Appointment-events', eventSchema);
}
