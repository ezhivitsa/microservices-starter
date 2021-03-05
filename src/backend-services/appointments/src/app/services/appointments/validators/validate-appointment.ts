import { NotFoundError } from '@root/services/errors';

interface Appointment {
  _id: string;
  deleted: boolean;
}

export function validateAppointmentExists<T extends Appointment>(appointment: T | null): T {
  if (!appointment) {
    throw new NotFoundError('Appointment not found');
  }

  return appointment;
}

export function validateAppointmentActive<T extends Appointment>(appointment: T | null): T {
  const appt = validateAppointmentExists(appointment);
  if (appt.deleted) {
    throw new Error('Appointment deleted');
  }

  return appt;
}
