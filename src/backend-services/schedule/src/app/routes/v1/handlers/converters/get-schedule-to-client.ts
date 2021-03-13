import { castTimestampToDate } from '@packages/proto';

import { ScheduleServiceTypes } from '@root/services';

import { GetScheduleRequest } from '../../types';

export function mapGetScheduleToClient(data: GetScheduleRequest): ScheduleServiceTypes.GetScheduleParams {
  const { from, to } = data;

  return {
    from: castTimestampToDate(from),
    to: castTimestampToDate(to),
  };
}
