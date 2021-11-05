import { Model, SchemaDefinition, Connection } from '@packages/mongo-storage';
import { SnapshotDocument, getSnapshotSchema } from '@packages/event-sourcing';

export interface AppointmentSnapshotData {
  _id: string;
  userId: string;
  start: Date;
  end: Date;
  description?: string;
  deleted: boolean;
}

export type AppointmentSnapshotDocument = SnapshotDocument<AppointmentSnapshotData>;
export type AppointmentSnapshotModel = Model<AppointmentSnapshotDocument>;

const appointmentSnapshotDataSchema: SchemaDefinition = {
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
};

const snapshotSchema = getSnapshotSchema(appointmentSnapshotDataSchema);

export function initAppointmentSnapshot(mongo: Connection): AppointmentSnapshotModel {
  return mongo.model<AppointmentSnapshotDocument>('appointment-snapshots', snapshotSchema);
}
