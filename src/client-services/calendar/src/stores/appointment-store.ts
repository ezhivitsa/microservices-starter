import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { ServiceTypes, Types } from '@packages/common';
import { ApiError } from '@packages/client';

import { AppointmentsService } from 'services';

export enum FormikUpdateAppointmentFieldName {
  Start = 'start',
  End = 'end',
  Description = 'description',
}

export interface FormikUpdateAppointment {
  [FormikUpdateAppointmentFieldName.Start]: Date;
  [FormikUpdateAppointmentFieldName.End]: Date;
  [FormikUpdateAppointmentFieldName.Description]: string;
}

export class AppointmentStore {
  id: string;
  userId: string;
  firstName?: string;
  lastName: string;
  start: string;
  end: string;
  description?: string;

  updateStatus: Types.Status = Types.Status.Initial;
  updateError: ApiError | null = null;

  constructor(data: ServiceTypes.Appointment) {
    this.id = data.id;
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.start = data.start;
    this.end = data.end;
    this.description = data.description;

    makeObservable(this, {
      userId: observable,
      start: observable,
      end: observable,
      description: observable,

      updateStatus: observable,
      updateError: observable,

      startDate: computed,
      endDate: computed,
      update: action,
    });
  }

  get startDate(): Date {
    return new Date(this.start);
  }

  get endDate(): Date {
    return new Date(this.end);
  }

  get userFullName(): string {
    return `${this.firstName || ''} ${this.lastName}`.trim();
  }

  async update(data: FormikUpdateAppointment): Promise<void> {
    this.updateStatus = Types.Status.Pending;

    try {
      const start = data.start.toISOString();
      const end = data.end.toISOString();

      await AppointmentsService.updateAppointment(this.id, {
        start,
        end,
        description: data.description,
      });

      runInAction(() => {
        this.start = start;
        this.end = end;
        this.description = data.description;

        this.updateStatus = Types.Status.Done;
        this.updateError = null;
      });
    } catch (err) {
      runInAction(() => {
        this.updateStatus = Types.Status.Error;
        this.updateError = err;
      });
    }
  }
}
