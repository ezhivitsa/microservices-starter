import * as AuthorizationTypes from '../types';
import { root } from './root';

export const createAppointmentRequest = root.loadProtoMessage<AuthorizationTypes.CreateAppointmentRequest>(
  'microservices_starter.appointments.appointment.CreateAppointmentRequest',
);

export const createAppointmentResponse = root.loadProtoMessage<AuthorizationTypes.CreateAppointmentResponse>(
  'microservices_starter.appointments.appointment.CreateAppointmentResponse',
);

export const updateAppointmentRequest = root.loadProtoMessage<AuthorizationTypes.UpdateAppointmentRequest>(
  'microservices_starter.appointments.appointment.UpdateAppointmentRequest',
);

export const deleteAppointmentRequest = root.loadProtoMessage<AuthorizationTypes.DeleteAppointmentRequest>(
  'microservices_starter.appointments.appointment.DeleteAppointmentRequest',
);

export const appointmentCreatedEvent = root.loadProtoMessage<AuthorizationTypes.AppointmentCreatedEvent>(
  'microservices_starter.appointments.appointment.AppointmentCreatedEvent',
);

export const appointmentUpdatedEvent = root.loadProtoMessage<AuthorizationTypes.AppointmentUpdatedEvent>(
  'microservices_starter.appointments.appointment.AppointmentUpdatedEvent',
);

export const appointmentDeletedEvent = root.loadProtoMessage<AuthorizationTypes.AppointmentDeletedEvent>(
  'microservices_starter.appointments.appointment.AppointmentDeletedEvent',
);
