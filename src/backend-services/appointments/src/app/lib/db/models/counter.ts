import { Connection, Schema, Model, Document } from 'mongoose';

interface CounterData {
  sequenceValue: number;
}

interface CounterDocument extends CounterData, Document<string> {}

type CounterModel = Model<CounterDocument>;

const counterSchema = new Schema<CounterDocument, CounterModel>({
  _id: {
    type: String,
    required: true,
  },
  sequenceValue: {
    type: Number,
    required: true,
  },
});

export function initCounter(mongo: Connection): CounterModel {
  return mongo.model<CounterDocument>('counters', counterSchema);
}
