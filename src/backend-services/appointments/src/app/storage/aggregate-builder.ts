import { Event } from '@packages/communication';

import { EventDocument } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

type EventHandler<ED extends Record<string, any>> = (data: ED) => void;

export abstract class AggregateBuilder<D> {
  protected _data: D | null = null;
  protected _emitter: Partial<Record<Event, EventHandler<any>[]>> = {};

  protected abstract _initEvents(): void;

  constructor(protected _aggregateId: string) {}

  private _setInitialData(snapshot: SnapshotDocument<D>): void {
    this._data = {
      _id: this._aggregateId,
      ...snapshot.data,
    };
  }

  protected _handle<ED extends Record<string, any>>(event: Event, handler: EventHandler<ED>): void {
    this._emitter[event] = this._emitter[event] || [];
    const handlers = this._emitter[event];
    if (handlers) {
      handlers.push(handler);
    }
  }

  build(snapshot: SnapshotDocument<D> | null, events: EventDocument[]): D | null {
    this._initEvents();

    if (!snapshot && !events.length) {
      return null;
    }

    if (snapshot) {
      this._setInitialData(snapshot);
    }

    const sortedEvents = events.sort((event1, event2) => event1.version - event2.version);

    sortedEvents.forEach((event) => {
      const handlers = this._emitter[event.type] || [];

      handlers.forEach((handler) => {
        handler(event.data);
      });
    });

    return this._data;
  }
}
