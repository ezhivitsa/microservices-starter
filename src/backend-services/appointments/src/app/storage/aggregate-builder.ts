import { EventEmitter } from 'events';

import { Event } from '@packages/communication';

import { EventDocument } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

type EventHandler<ED extends Record<string, any>> = (data: ED) => void;

export abstract class AggregateBuilder<D> {
  protected _data: D | null = null;
  protected _emitter: EventEmitter;

  protected abstract _initEvents(): void;

  constructor(protected _aggregateId: string) {
    this._emitter = new EventEmitter();
    this._initEvents();
  }

  private _setInitialData(snapshot: SnapshotDocument<D>): void {
    this._data = snapshot.data;
  }

  protected _handle<ED extends Record<string, any>>(event: Event, handler: EventHandler<ED>): void {
    this._emitter.on(event, handler);
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
