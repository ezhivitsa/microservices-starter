import * as ScheduleTypes from '../types';
import { root } from './root';

export const getScheduleRequest = root.loadProtoMessage<ScheduleTypes.GetScheduleRequest>(
  'microservices_starter.schedule.schedule.GetScheduleRequest',
);

export const getScheduleResponse = root.loadProtoMessage<ScheduleTypes.GetScheduleResponse>(
  'microservices_starter.schedule.schedule.GetScheduleResponse',
);
