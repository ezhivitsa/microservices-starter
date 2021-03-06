export interface AppointmentCreatedData {
  userId: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface AppointmentUpdatedData {
  start: Date;
  end: Date;
  description?: string;
}
