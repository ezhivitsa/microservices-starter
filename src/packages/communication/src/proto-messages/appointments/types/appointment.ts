import { CommonTypes } from '../../common';
import { Timestamp } from '../../google';

// CreateAppointment
export interface CreateAppointmentRequest {
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
}

export interface CreateAppointmentResponse {
  id?: string;
}

// UpdateAppointment
export interface UpdateAppointmentRequest {
  id?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
}

// DeleteAppointment
export interface DeleteAppointmentRequest {
  id?: string;
}

// Events
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
