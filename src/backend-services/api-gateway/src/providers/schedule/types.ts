export interface GetScheduleParams {
  from: Date;
  to: Date;
}

export interface ScheduleAppointment {
  id: string;
  start: Date;
  end: Date;
  description?: string;
  userId: string;
  firstName?: string;
  lastName: string;
}
