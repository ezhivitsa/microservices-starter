import { ScheduleTypes, ScheduleCommand } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';
import { Version } from '../../messages';

import { BaseClient } from '../base-client';
import { ClientCommandMetadata } from '../types';

import { ScheduleError } from './schedule-error';

export class ScheduleClient extends BaseClient<ScheduleError> {
  _channel = Channel.Schedule;
  _version = Version.v1;

  _getClientError(err: Error): ScheduleError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new ScheduleError(errorData);
  }

  getScheduleCommand(
    data: ScheduleTypes.GetScheduleRequest,
    metadata: ClientCommandMetadata,
  ): Promise<ScheduleTypes.GetScheduleResponse> {
    return this._sendCommand(
      {
        data,
        command: ScheduleCommand.GetSchedule,
      },
      metadata,
    );
  }
}
