import { scheduleClient } from 'lib/clients';

import { ProviderTypes } from 'providers';

import { mapMetadataToProto } from '../converters';
import { mapGetScheduleToProto, mapAppointmentToClient } from './converters';

import { GetScheduleParams, ScheduleAppointment } from './types';

export async function getSchedule(
  params: GetScheduleParams,
  metadata: ProviderTypes.Metadata,
): Promise<ScheduleAppointment[]> {
  const { appointments } = await scheduleClient.getScheduleCommand(
    mapGetScheduleToProto(params),
    mapMetadataToProto(metadata),
  );

  return (appointments || []).map(mapAppointmentToClient).filter(Boolean) as ScheduleAppointment[];
}
