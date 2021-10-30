import { Schema, Model, Document } from 'mongoose';

import { Event } from '@packages/communication';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export interface EventDocument extends DbEvent, Document<string> {}

export type EventModel = Model<EventDocument>;

export const eventSchema = new Schema<EventDocument, EventModel>({
  _id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
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
  data: {
    type: Schema.Types.Mixed,
  },
});
