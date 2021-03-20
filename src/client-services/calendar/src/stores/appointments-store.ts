import { makeObservable, observable, action, runInAction, computed } from 'mobx';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

import { Types, ServiceTypes } from '@packages/common';
import { ApiError } from '@packages/client';

import { AppointmentsService } from 'services';

import { AppointmentStore } from './appointment-store';

export class AppointmentsStore {
  appointmentsList: AppointmentStore[] = [];
  from: Date;
  to: Date;

  fetchStatus: Types.Status = Types.Status.Initial;
  fetchError: ApiError | null = null;

  deleteStatus: Types.Status = Types.Status.Initial;
  deleteError: ApiError | null = null;

  constructor() {
    this.from = startOfWeek(new Date());
    this.to = endOfWeek(new Date());

    makeObservable(this, {
      appointmentsList: observable,
      from: observable,
      to: observable,

      fetchStatus: observable,
      fetchError: observable,
      deleteStatus: observable,
      deleteError: observable,

      isDeleting: computed,
      appointments: computed,

      add: action,
      setFrom: action,
      setTo: action,
      fetch: action,
    });
  }

  get isDeleting(): boolean {
    return this.deleteStatus === Types.Status.Pending;
  }

  get appointments(): AppointmentStore[] {
    const { from, to } = this;

    return this.appointmentsList.filter(({ startDate }) => isWithinInterval(startDate, { start: from, end: to }));
  }

  add(data: ServiceTypes.Appointment): void {
    this.appointmentsList.push(new AppointmentStore(data));
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
        this.appointmentsList = response.appointments.map((appointment) => new AppointmentStore(appointment));
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
        this.appointmentsList = this.appointments.filter((appointment) => appointment.id !== id);

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
