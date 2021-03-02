import { AppointmentTypes } from '@packages/communication';

export interface CreateAppointmentRequest
  extends Required<Omit<AppointmentTypes.CreateAppointmentRequest, 'description'>> {
  description?: string;
}
