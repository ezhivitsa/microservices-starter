export interface CreateAppointmentParams {
  id: string;
  userId: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface UpdateAppointmentParams {
  id: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface DeleteAppointmentParams {
  id: string;
}
