import { AppointmentsProviderTypes, ScheduleProviderTypes } from 'providers';

export type CreateAppointmentParams = AppointmentsProviderTypes.CreateAppointmentParams;
export type UpdateAppointmentParams = AppointmentsProviderTypes.UpdateAppointmentParams;
export type DeleteAppointmentParams = AppointmentsProviderTypes.DeleteAppointmentParams;

export type GetAppointmentsParams = ScheduleProviderTypes.GetScheduleParams;
export type Appointment = ScheduleProviderTypes.ScheduleAppointment;
