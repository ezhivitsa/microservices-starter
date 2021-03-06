import * as AppointmentSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum AppointmentCommand {
  CreateAppointment = 'create-appointment',
  UpdateAppointment = 'update-appointment',
  DeleteAppointment = 'delete-appointment',
}

export const appointmentCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.Appointments,
  [
    {
      command: AppointmentCommand.CreateAppointment,
      requestSchema: AppointmentSchemas.createAppointmentRequest,
      responseSchema: AppointmentSchemas.createAppointmentResponse,
    },
    {
      command: AppointmentCommand.UpdateAppointment,
      requestSchema: AppointmentSchemas.updateAppointmentRequest,
    },
    {
      command: AppointmentCommand.DeleteAppointment,
      requestSchema: AppointmentSchemas.deleteAppointmentRequest,
    },
  ],
  Version.v1,
  AppointmentSchemas.error,
);
