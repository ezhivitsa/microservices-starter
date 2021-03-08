import { AppointmentsClient, AppointmentTypes, CommandUserRole, ClientCommandMetadata } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const appointmentsClient = new AppointmentsClient(kafka);

const metadata: ClientCommandMetadata = {
  requestId: '1',
  user: {
    id: '1',
    roles: [CommandUserRole.User, CommandUserRole.Admin, CommandUserRole.OrganizationAdmin],
  },
};

export function createAppointmentCommand(
  data: AppointmentTypes.CreateAppointmentRequest,
): Promise<AppointmentTypes.CreateAppointmentResponse> {
  return appointmentsClient.createAppointmentCommand(data, metadata);
}

export function updateAppointmentCommand(data: AppointmentTypes.UpdateAppointmentRequest): Promise<void> {
  return appointmentsClient.updateAppointmentCommand(data, metadata);
}

export function deleteAppointmentCommand(data: AppointmentTypes.DeleteAppointmentRequest): Promise<void> {
  return appointmentsClient.deleteAppointmentCommand(data, metadata);
}
