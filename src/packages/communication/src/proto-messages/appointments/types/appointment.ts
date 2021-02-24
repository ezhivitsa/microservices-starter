import { CommonTypes } from '../../common';
import { Timestamp } from '../../google';

// CreateAppointment
export interface CreateAppointmentRequest {
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
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
export interface AppointmentCreatedEvent {
  id?: string;
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
  metadata?: CommonTypes.EventMeta;
}

export interface AppointmentUpdatedEvent {
  id?: string;
  userId?: string;
  start?: Timestamp;
  end?: Timestamp;
  description?: string;
  metadata?: CommonTypes.EventMeta;
}

export interface AppointmentDeletedEvent {
  id?: string;
  metadata?: CommonTypes.EventMeta;
}
