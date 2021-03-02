export interface CreateAppointmentParams {
  userId: string;
  start: Date;
  end: Date;
  description?: string;
}
