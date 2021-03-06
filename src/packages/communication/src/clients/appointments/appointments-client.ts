import { AppointmentTypes, AppointmentCommand, AppointmentEvent, CommonTypes } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';
import { Version } from '../../messages';

import { BaseClient } from '../base-client';
import { CommandMetadata } from '../types';

import { AppointmentsError } from './appointments-error';

export class AppointmentsClient extends BaseClient<AppointmentsError> {
  _channel = Channel.APPOINTMENTS;
  _version = Version.v1;

  _getClientError(err: Error): AppointmentsError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new AppointmentsError(errorData);
  }

  createAppointmentCommand(
    data: AppointmentTypes.CreateAppointmentRequest,
    metadata: CommandMetadata,
  ): Promise<AppointmentTypes.CreateAppointmentResponse> {
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

  appointmentCreatedEvent(data: AppointmentTypes.AppointmentCreatedData, metadata: CommonTypes.EventMeta): void {
    this._sendEvent<AppointmentTypes.AppointmentCreatedEvent>({
      data: {
        data,
        metadata,
      },
      event: AppointmentEvent.AppointmentCreated,
    });
  }

  appointmentUpdatedEvent(data: AppointmentTypes.AppointmentUpdatedData, metadata: CommonTypes.EventMeta): void {
    this._sendEvent<AppointmentTypes.AppointmentUpdatedEvent>({
      data: {
        data,
        metadata,
      },
      event: AppointmentEvent.AppointmentUpdated,
    });
  }

  appointmentDeletedEvent(data: AppointmentTypes.AppointmentDeletedData, metadata: CommonTypes.EventMeta): void {
    this._sendEvent<AppointmentTypes.AppointmentDeletedEvent>({
      data: {
        data,
        metadata,
      },
      event: AppointmentEvent.AppointmentDeleted,
    });
  }
}
