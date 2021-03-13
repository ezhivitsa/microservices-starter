import { AppointmentsService, AppointmentsServiceTypes } from '@root/services';

const defaultAppointment: AppointmentsServiceTypes.CreateAppointmentParams = {
  id: '1',
  start: new Date(),
  end: new Date(),
  description: 'description',
  userId: '1',
};

export async function createAppointment(
  data: Partial<AppointmentsServiceTypes.CreateAppointmentParams> = {},
): Promise<void> {
  await AppointmentsService.createAppointment({
    ...defaultAppointment,
    ...data,
  });
}
