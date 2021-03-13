export interface GetScheduleParams {
  from: Date;
  to: Date;
}

export interface AppointmentUser {
  id: string;
  firstName?: string;
  lastName: string;
}

export interface ScheduleAppointment {
  id: string;
  user: AppointmentUser;
  start: Date;
  end: Date;
  description?: string;
}
