import mongoose, { Schema, Model, Document, SchemaDefinition } from 'mongoose';

interface AppointmentSnapshotData {
  userId: string;
  start: Date;
  end: Date;
  description: string;
  deleted: boolean;
}

interface Snapshot<T> {
  id: string;
  version: number;
  data: T;
}

export interface SnapshotDocument<T> extends Snapshot<T>, Document<string> {
  id: string;
}

type AppointmentSnapshotDocument = SnapshotDocument<AppointmentSnapshotData>;
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

const shapshotSchema = new Schema<AppointmentSnapshotDocument, AppointmentSnapshotModel>({
  id: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  data: appointmentSnapshotDataSchema,
});

export const AppointmentSnapshot = mongoose.model<AppointmentSnapshotDocument>('appointment-snapshots', shapshotSchema);
