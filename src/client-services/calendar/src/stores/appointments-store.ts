import { makeObservable, observable, action, runInAction } from 'mobx';
import { startOfWeek, endOfWeek } from 'date-fns';

import { Types, ServiceTypes } from '@packages/common';
import { ApiError } from '@packages/client';

import { AppointmentsService } from 'services';

import { AppointmentStore } from './appointment-store';

export class AppointmentsStore {
  appointments: AppointmentStore[] = [];
  from: Date;
  to: Date;

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  deleteStatus: Types.Status = Types.Status.Initial;
  deleteError: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      appointments: observable,
      from: observable,
      to: observable,

      fetchStatus: observable,
      fetchError: observable,
      deleteStatus: observable,
      deleteError: observable,

      add: action,
      setFrom: action,
      setTo: action,
      fetch: action,
    });

    this.from = startOfWeek(new Date());
    this.to = endOfWeek(new Date());
  }

  get isDeleting(): boolean {
    return this.deleteStatus === Types.Status.Pending;
  }

  add(data: ServiceTypes.Appointment): void {
    this.appointments.push(new AppointmentStore(data));
  }

  setFrom(date: Date): void {
    this.from = date;
    this.fetch();
  }

  setTo(date: Date): void {
    this.to = date;
    this.fetch();
  }

  async fetch(): Promise<void> {
    this.fetchStatus = Types.Status.Pending;

    try {
      const response = await AppointmentsService.getAppointments({
        from: this.from.toISOString(),
        to: this.to.toISOString(),
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

  async delete(id: string): Promise<void> {
    this.deleteStatus = Types.Status.Pending;

    try {
      await AppointmentsService.deleteAppointment(id);

      runInAction(() => {
        this.appointments = this.appointments.filter((appointment) => appointment.id !== id);

        this.deleteStatus = Types.Status.Done;
        this.deleteError = null;
      });
    } catch (err) {
      runInAction(() => {
        this.deleteStatus = Types.Status.Error;
        this.deleteError = err;
      });
    }
  }
}
