import * as ScheduleSchemas from './schemas';

import { getChannelCommands, ChannelCommandSchema, Version } from '../../messages';
import { Channel } from '../../channels';

export enum ScheduleCommand {
  GetSchedule = 'get-schedule',
}

export const scheduleCommandSchemas: Record<string, ChannelCommandSchema> = getChannelCommands(
  Channel.Schedule,
  [
    {
      command: ScheduleCommand.GetSchedule,
      requestSchema: ScheduleSchemas.getScheduleRequest,
      responseSchema: ScheduleSchemas.getScheduleResponse,
    },
  ],
  Version.v1,
  ScheduleSchemas.error,
);
