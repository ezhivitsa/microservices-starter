import { Schema, SchemaDefinition, Document, Model } from 'mongoose';

interface Snapshot<T> {
  version: number;
  data: T;
}

export interface SnapshotDocument<T> extends Snapshot<T>, Document<string> {}

export function getSnapshotSchema<D>(
  dataSchema: SchemaDefinition,
): Schema<SnapshotDocument<D>, Model<SnapshotDocument<D>>> {
  return new Schema<SnapshotDocument<D>, Model<SnapshotDocument<D>>>({
    _id: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    data: dataSchema,
  });
}
