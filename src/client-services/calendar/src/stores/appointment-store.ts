import { makeObservable, observable, computed, action } from 'mobx';
import { ServiceTypes, Types } from '@packages/common';
import { ApiError } from '@packages/client';

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

    this.id = data.id;
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.start = data.start;
    this.end = data.end;
    this.description = data.description;
  }

  get startDate(): Date {
    return new Date(this.start);
  }

  get endDate(): Date {
    return new Date(this.end);
  }

  async update(): Promise<void> {
    this.updateStatus = Types.Status.Pending;
  }
}
