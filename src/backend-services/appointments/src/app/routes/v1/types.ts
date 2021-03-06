import { AppointmentTypes } from '@packages/communication';

export interface CreateAppointmentRequest
  extends Required<Omit<AppointmentTypes.CreateAppointmentRequest, 'description'>> {
  description?: string;
}

export interface UpdateAppointmentRequest
  extends Required<Omit<AppointmentTypes.UpdateAppointmentRequest, 'description'>> {
  description?: string;
}

export type DeleteAppointmentRequest = Required<AppointmentTypes.DeleteAppointmentRequest>;
