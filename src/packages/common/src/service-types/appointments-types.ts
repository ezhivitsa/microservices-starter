export interface CreateAppointmentRequest {
  userId: string;
  start: string;
  end: string;
  description?: string;
}

export interface CreateAppointmentResponse {
  id: string;
}

export interface UpdateAppointmentRequest {
  start: string;
  end: string;
  description?: string;
}

export interface Appointment {
  id: string;
  start: string;
  end: string;
  description?: string;
  userId: string;
  firstName?: string;
  lastName: string;
}

export interface GetAppointmentsResponse {
  appointments: Appointment[];
}
