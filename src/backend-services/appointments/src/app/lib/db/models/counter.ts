import { Connection, Schema, Model, Document } from 'mongoose';

interface CounterData {
  sequenceValue: number;
}

interface CounterDocument extends CounterData, Document<string> {
  id: string;
}

type CounterModel = Model<CounterDocument>;

const counterSchema = new Schema<CounterDocument, CounterModel>({
  sequenceValue: {
    type: Number,
    required: true,
  },
});

export function initCounter(mongo: Connection): CounterModel {
  return mongo.model<CounterDocument>('counters', counterSchema);
}
