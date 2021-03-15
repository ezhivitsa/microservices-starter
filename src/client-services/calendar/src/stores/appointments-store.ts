import { makeObservable, observable, action, runInAction } from 'mobx';

import { Types, ServiceTypes } from '@packages/common';
import { ApiError } from '@packages/client';

import { AppointmentsService } from 'services';

import { AppointmentStore } from './appointment-store';

interface FetchData {
  from: Date;
  to: Date;
}

export class AppointmentsStore {
  appointments: AppointmentStore[] = [];

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      appointments: observable,
      add: action,
      fetch: action,
    });
  }

  add(data: ServiceTypes.Appointment): void {
    this.appointments.push(new AppointmentStore(data));
  }

  async fetch({ from, to }: FetchData): Promise<void> {
    this.fetchStatus = Types.Status.Pending;

    try {
      const response = await AppointmentsService.getAppointments({
        from: from.toISOString(),
        to: to.toISOString(),
      });

      runInAction(() => {
        this.appointments = response.appointments.map((appointment) => new AppointmentStore(appointment));
        this.fetchStatus = Types.Status.Done;
        this.fetchError = null;
      });
    } catch (error) {
      runInAction(() => {
        this.fetchStatus = Types.Status.Error;
        this.fetchError = error;
      });
    }
  }
}
