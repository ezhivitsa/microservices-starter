import { Connection } from '@packages/mongo-storage';
import { counterSchema, CounterModel, CounterDocument } from '@packages/event-sourcing';

export function initCounter(mongo: Connection): CounterModel {
  return mongo.model<CounterDocument>('counters', counterSchema);
}
