import mongoose, { Schema, Model, Document, SchemaDefinition, Connection } from 'mongoose';

export interface AppointmentSnapshotData {
  _id: string;
  userId: string;
  start: Date;
  end: Date;
  description?: string;
  deleted: boolean;
}

interface Snapshot<T> {
  version: number;
  data: T;
}

export interface SnapshotDocument<T> extends Snapshot<T>, Document<string> {}

export type AppointmentSnapshotDocument = SnapshotDocument<AppointmentSnapshotData>;
export type AppointmentSnapshotModel = Model<AppointmentSnapshotDocument>;

const appointmentSnapshotDataSchema: SchemaDefinition = {
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

const snapshotSchema = new Schema<AppointmentSnapshotDocument, AppointmentSnapshotModel>({
  _id: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  data: appointmentSnapshotDataSchema,
});

// export function initAppointmentSnapshot(mongo: Connection): AppointmentSnapshotModel {
//   return mongo.model<AppointmentSnapshotDocument>('appointment-snapshots', snapshotSchema);
// }

export function initAppointmentSnapshot(): AppointmentSnapshotModel {
  return mongoose.model<AppointmentSnapshotDocument>('appointment-snapshots', snapshotSchema);
}
