import { AppointmentEvent } from '@packages/communication';

import { EventModel, AggregateService, AggregateBuilder, CounterModel } from '@packages/event-sourcing';

import { AppointmentSnapshotData, AppointmentSnapshotModel } from '@root/lib/db/models/appointment-snapshot';
import { db } from '@root/lib/db';

import { AppointmentCreatedData, AppointmentUpdatedData } from '@root/services/appointments/types';

class AppointmentAggregateBuilder extends AggregateBuilder<AppointmentSnapshotData> {
  private _handleAppointmentCreated = (data: AppointmentCreatedData): void => {
    this._data = {
      _id: this._aggregateId,
      userId: data.userId,
      start: data.start,
      end: data.end,
      description: data.description,
      deleted: false,
    };
  };

  private _handleAppointmentUpdated = (data: AppointmentUpdatedData): void => {
    if (!this._data) {
      return;
    }

    this._data.start = data.start;
    this._data.end = data.end;
    this._data.description = data.description;
  };

  private _handleAppointmentDeleted = (): void => {
    if (!this._data) {
      return;
    }

    this._data.deleted = true;
  };

  protected _initEvents(): void {
    this._handle(AppointmentEvent.AppointmentCreated, this._handleAppointmentCreated);
    this._handle(AppointmentEvent.AppointmentUpdated, this._handleAppointmentUpdated);
    this._handle(AppointmentEvent.AppointmentDeleted, this._handleAppointmentDeleted);
  }
}

export class AppointmentsAggregateService extends AggregateService<AppointmentSnapshotData> {
  protected _EventModel: EventModel = db.AppointmentEvent;
  protected _CounterModel: CounterModel = db.Counter;
  protected _SnapshotModel: AppointmentSnapshotModel = db.AppointmentSnapshot;
  protected _Builder: typeof AppointmentAggregateBuilder = AppointmentAggregateBuilder;
}

export const appointmentsAggregateService = new AppointmentsAggregateService();
