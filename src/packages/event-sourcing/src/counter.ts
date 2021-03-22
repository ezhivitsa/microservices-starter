import { Schema, Model, Document } from 'mongoose';

interface CounterData {
  sequenceValue: number;
}

export interface CounterDocument extends CounterData, Document<string> {}

export type CounterModel = Model<CounterDocument>;

export const counterSchema = new Schema<CounterDocument, CounterModel>({
  _id: {
    type: String,
    required: true,
  },
  sequenceValue: {
    type: Number,
    required: true,
  },
});
