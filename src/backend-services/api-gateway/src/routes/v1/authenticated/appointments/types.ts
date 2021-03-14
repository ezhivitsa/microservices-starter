export interface UpdateAppointmentParams {
  appointmentId: string;
}

export interface DeleteAppointmentParams {
  appointmentId: string;
}

export interface GetAppointmentsQueryParams {
  from: Date;
  to: Date;
}
