import { makeObservable, observable, runInAction, computed, action } from 'mobx';
import { Types } from '@packages/common';
import { ApiError } from '@packages/client';

import { AppointmentsService } from 'services';

import { AppointmentsStore } from './appointments-store';
import { UsersStore } from './users-store';

export enum FormikCreateAppointmentFieldName {
  UserId = 'userId',
  Start = 'start',
  End = 'end',
  Description = 'description',
}

export interface FormikCreateAppointment {
  [FormikCreateAppointmentFieldName.UserId]: string;
  [FormikCreateAppointmentFieldName.Start]: Date;
  [FormikCreateAppointmentFieldName.End]: Date;
  [FormikCreateAppointmentFieldName.Description]: string;
}

export class CreateAppointmentStore {
  private _usersStore: UsersStore;
  private _appointmentsStore: AppointmentsStore;

  createStatus: Types.Status = Types.Status.Initial;
  createError: ApiError | null = null;

  constructor(appointmentsStore: AppointmentsStore, usersStore: UsersStore) {
    this._appointmentsStore = appointmentsStore;
    this._usersStore = usersStore;

    makeObservable(this, {
      createStatus: observable,
      createError: observable,
      isCreating: computed,
      create: action,
      dispose: action,
    });
  }

  get isCreating(): boolean {
    return this.createStatus === Types.Status.Pending;
  }

  async create(data: FormikCreateAppointment): Promise<void> {
    this.createStatus = Types.Status.Pending;

    const appointmentData = {
      userId: data.userId,
      start: data.start.toISOString(),
      end: data.end.toISOString(),
      description: data.description || undefined,
    };

    try {
      const response = await AppointmentsService.createAppointment(appointmentData);
      const user = this._usersStore.users.find(({ id }) => id === data.userId);

      this._appointmentsStore.add({
        id: response.id,
        firstName: user?.firstName,
        lastName: user?.lastName || '',
        ...appointmentData,
      });

      runInAction(() => {
        this.createStatus = Types.Status.Done;
        this.createError = null;
      });
    } catch (err) {
      runInAction(() => {
        this.createStatus = Types.Status.Error;
        this.createError = err as ApiError;
      });
    }
  }

  dispose(): void {
    this.createStatus = Types.Status.Initial;
    this.createError = null;
  }
}
