export interface CreateAppointmentParams {
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

export type AppointmentCreatedData = CreateAppointmentParams;
export type AppointmentUpdatedData = Omit<UpdateAppointmentParams, 'id'>;
