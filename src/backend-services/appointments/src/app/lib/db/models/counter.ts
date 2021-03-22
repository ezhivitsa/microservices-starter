import { Connection } from 'mongoose';

import { counterSchema, CounterModel, CounterDocument } from '@packages/event-sourcing';

export function initCounter(mongo: Connection): CounterModel {
  return mongo.model<CounterDocument>('counters', counterSchema);
}
