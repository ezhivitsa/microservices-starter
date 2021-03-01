import mongoose, { Schema, Model, Document } from 'mongoose';

import { Event } from '@packages/communication';

export interface EventMetadata {
  createdAt?: Date;
  userId?: string;
}

export interface DbEvent {
  createdAt: Date;
  type: Event;
  aggregateId: string;
  version: number;
  metadata: EventMetadata;
  data: Record<string, any>;
}

export interface EventDocument extends DbEvent, Document<string> {
  id: string;
}

export type EventModel = Model<EventDocument>;

const eventSchema = new Schema<EventDocument, EventModel>({
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
    },
    userId: {
      type: String,
    },
  },
});

export const AppointmentEvent = mongoose.model<EventDocument>('Appointment-events', eventSchema);
