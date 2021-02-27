import { EventDocument } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

export class AggregateBuilder<D> {
  protected _data: D | null = null;

  constructor(private _snapshot: SnapshotDocument<D> | null, private _events: EventDocument[]) {}

  build(): D | null {
    if (!this._snapshot && !this._events.length) {
      return null;
    }

    const sortedEvents = this._events.sort((event1, event2) => event1.version - event2.version);

    return this._data;
  }
}
