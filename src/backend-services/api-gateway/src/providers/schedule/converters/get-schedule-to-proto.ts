import { ScheduleTypes } from '@packages/communication';
import { castDateToTimestamp } from '@packages/proto';

import { GetScheduleParams } from '../types';

export function mapGetScheduleToProto(data: GetScheduleParams): ScheduleTypes.GetScheduleRequest {
  const { from, to } = data;

  return {
    from: castDateToTimestamp(from),
    to: castDateToTimestamp(to),
  };
}
