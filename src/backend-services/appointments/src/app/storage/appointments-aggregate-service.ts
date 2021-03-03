import { AppointmentEvent } from '@packages/communication';

import { AppointmentSnapshotData, AppointmentSnapshotModel } from '@root/lib/db/models/appointment-snapshot';
import { EventModel } from '@root/lib/db/models/appointment-event';
import { db } from '@root/lib/db/models';

import { AppointmentCreatedData, AppointmentUpdatedData } from '@root/services/appointments/types';

import { AggregateService } from './aggregate-service';
import { AggregateBuilder } from './aggregate-builder';

class AppointmentAggregateBuilder extends AggregateBuilder<AppointmentSnapshotData> {
  constructor() {
    super();
  }

  private _handleAppointmentCreated(data: AppointmentCreatedData): void {
    this._data = {
      userId: data.userId,
      start: data.start,
      end: data.end,
      description: data.description,
      deleted: false,
    };
  }

  private _handleAppointmentUpdated(data: AppointmentUpdatedData): void {
    if (!this._data) {
      return;
    }

    this._data.start = data.start;
    this._data.end = data.end;
    this._data.description = data.description;
  }

  private _handleAppointmentDeleted(): void {
    if (!this._data) {
      return;
    }

    this._data.deleted = true;
  }

  protected _initEvents(): void {
    this._handle(AppointmentEvent.AppointmentCreated, this._handleAppointmentCreated);
    this._handle(AppointmentEvent.AppointmentUpdated, this._handleAppointmentUpdated);
    this._handle(AppointmentEvent.AppointmentDeleted, this._handleAppointmentDeleted);
  }
}

export class AppointmentsAggregateService extends AggregateService<AppointmentSnapshotData> {
  protected _EventModel: EventModel = db.AppointmentEvent;
  protected _SnapshotModel: AppointmentSnapshotModel = db.AppointmentSnapshot;
  protected _Builder: typeof AppointmentAggregateBuilder = AppointmentAggregateBuilder;
}

export const appointmentsAggregateService = new AppointmentsAggregateService();
