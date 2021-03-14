import { ServiceTypes } from '@packages/common';

import { AppointmentsTypes } from 'services';

export function mapAppointmentToFront(appointment: AppointmentsTypes.Appointment): ServiceTypes.Appointment {
  const { start, end, ...restData } = appointment;

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    ...restData,
  };
}
