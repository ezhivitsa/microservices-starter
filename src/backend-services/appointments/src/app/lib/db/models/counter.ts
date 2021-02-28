import mongoose, { Schema, Model, Document } from 'mongoose';

interface Counter {
  id: string;
  aggregateId: string;
}

interface CounterDocument extends Counter, Document<string> {
  id: string;
}

type CounterModel = Model<CounterDocument>;

const counterSchema = new Schema<CounterDocument, CounterModel>({
  aggregateId: {
    type: String,
    required: true,
  },
});

export const Counter = mongoose.model<CounterDocument>('counters', counterSchema);
