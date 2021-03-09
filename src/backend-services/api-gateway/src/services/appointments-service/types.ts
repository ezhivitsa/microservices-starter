import { AppointmentsProviderTypes } from 'providers';

export interface CreateAppointmentParams
  extends Required<Omit<AppointmentsProviderTypes.CreateAppointmentParams, 'description'>> {
  description?: string;
}

export interface UpdateAppointmentParams
  extends Required<Omit<AppointmentsProviderTypes.UpdateAppointmentParams, 'description'>> {
  description?: string;
}

export type DeleteAppointmentParams = Required<AppointmentsProviderTypes.DeleteAppointmentParams>;
