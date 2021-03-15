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
  constructor(private _appointmentsStore: AppointmentsStore, private _usersStore: UsersStore) {}

  async create(data: FormikCreateAppointment): Promise<void> {
    const appointmentData = {
      userId: data.userId,
      start: data.start.toISOString(),
      end: data.end.toISOString(),
      description: data.description || undefined,
    };
    const response = await AppointmentsService.createAppointment(appointmentData);
    const user = this._usersStore.users.find(({ id }) => id === data.userId);

    this._appointmentsStore.add({
      id: response.id,
      firstName: user?.firstName,
      lastName: user?.lastName || '',
      ...appointmentData,
    });
  }
}
