export interface AppointmentCreatedData {}

export interface AppointmentUpdatedData {}

export interface AppointmentDeletedData {}

export interface AppointmentCreatedData {
  id?: string;
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
}

export interface AppointmentCreatedEvent {
  data?: AppointmentCreatedData;
  metadata?: CommonTypes.EventMeta;
}

export interface AppointmentUpdatedData {
  id?: string;
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
}

export interface AppointmentUpdatedEvent {
  data?: AppointmentUpdatedData;
  metadata?: CommonTypes.EventMeta;
}

export interface AppointmentDeletedData {
  id?: string;
}

export interface AppointmentDeletedEvent {
  data?: AppointmentDeletedData;
  metadata?: CommonTypes.EventMeta;
}
