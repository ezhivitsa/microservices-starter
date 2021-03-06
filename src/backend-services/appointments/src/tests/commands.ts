import { AppointmentsClient, AppointmentTypes } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const appointmentsClient = new AppointmentsClient(kafka);

const metadata = {
  requestId: '1',
};

export function createAppointment(
  data: AppointmentTypes.CreateAppointmentRequest,
): Promise<AppointmentTypes.CreateAppointmentResponse> {
  return appointmentsClient.createAppointmentCommand(data, metadata);
}

export function updateAppointment(data: UserTypes.GetUserByAuthIdRequest): Promise<UserTypes.GetUserByAuthIdResponse> {
  return usersClient.getUserByAuthIdCommand(data, metadata);
}

export function deleteAppointment(data: UserTypes.UpdateUserRequest): Promise<UserTypes.UpdateUserResponse> {
  return usersClient.updateUserCommand(data, metadata);
}
