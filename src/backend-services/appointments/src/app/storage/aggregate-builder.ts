import { EventEmitter } from 'events';

import { EventDocument } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

export abstract class AggregateBuilder<D> {
  protected _data: D | null = null;
  protected _emitter: EventEmitter;

  protected abstract _initEvents(): void;
  protected abstract _setInitialData(snapshot: SnapshotDocument<D>): void;

  constructor() {
    this._emitter = new EventEmitter();
    this._initEvents();
  }

  build(snapshot: SnapshotDocument<D> | null, events: EventDocument[]): D | null {
    if (!snapshot && !events.length) {
      return null;
    }

    if (snapshot) {
      this._setInitialData(snapshot);
    }

    const sortedEvents = events.sort((event1, event2) => event1.version - event2.version);

    sortedEvents.forEach((event) => {
      this._emitter.emit(event.type, event.data);
    });

    return this._data;
  }
}
