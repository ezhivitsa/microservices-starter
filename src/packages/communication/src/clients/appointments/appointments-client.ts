import { AppointmentTypes, AppointmentCommand, AppointmentEvent } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';

import { BaseClient } from '../base-client';
import { CommandMetadata, EventMetadata } from '../types';

import { AppointmentsError } from './appointments-error';

export class AppointmentsClient extends BaseClient<AppointmentsError> {
  _channel = Channel.APPOINTMENTS;

  _getClientError(err: Error): AppointmentsError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new AppointmentsError(errorData);
  }

  createAppointmentCommand(data: AppointmentTypes.CreateAppointmentRequest, metadata: CommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AppointmentCommand.CreateAppointment,
      },
      metadata,
    );
  }

  updateAppointmentCommand(data: AppointmentTypes.UpdateAppointmentRequest, metadata: CommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AppointmentCommand.UpdateAppointment,
      },
      metadata,
    );
  }

  deleteAppointmentCommand(data: AppointmentTypes.DeleteAppointmentRequest, metadata: CommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: AppointmentCommand.DeleteAppointment,
      },
      metadata,
    );
  }

  appointmentCreatedEvent(data: AppointmentTypes.AppointmentCreatedEvent, metadata: EventMetadata): void {
    this._sendEvent(
      {
        data,
        event: AppointmentEvent.AppointmentCreated,
      },
      metadata,
    );
  }

  appointmentUpdatedEvent(data: AppointmentTypes.AppointmentUpdatedEvent, metadata: EventMetadata): void {
    this._sendEvent(
      {
        data,
        event: AppointmentEvent.AppointmentUpdated,
      },
      metadata,
    );
  }

  appointmentDeletedEvent(data: AppointmentTypes.AppointmentDeletedEvent, metadata: EventMetadata): void {
    this._sendEvent(
      {
        data,
        event: AppointmentEvent.AppointmentDeleted,
      },
      metadata,
    );
  }
}
