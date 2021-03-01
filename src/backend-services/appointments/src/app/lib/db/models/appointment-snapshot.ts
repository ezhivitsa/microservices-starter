import mongoose, { Schema, Model, Document, SchemaDefinition } from 'mongoose';

export interface AppointmentSnapshotData {
  userId: string;
  start: Date;
  end: Date;
  description: string;
  deleted: boolean;
}

interface Snapshot<T> {
  version: number;
  data: T;
}

export interface SnapshotDocument<T> extends Snapshot<T>, Document<string> {}

export type AppointmentSnapshotDocument = SnapshotDocument<AppointmentSnapshotData>;
type AppointmentSnapshotModel = Model<AppointmentSnapshotDocument>;

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
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
};

const snapshotSchema = new Schema<AppointmentSnapshotDocument, AppointmentSnapshotModel>({
  version: {
    type: Number,
    required: true,
  },
  data: appointmentSnapshotDataSchema,
});

export const AppointmentSnapshot = mongoose.model<AppointmentSnapshotDocument>('appointment-snapshots', snapshotSchema);
