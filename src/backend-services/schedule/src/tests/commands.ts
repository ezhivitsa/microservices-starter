import { ScheduleClient, ScheduleTypes, CommandUserRole, ClientCommandMetadata } from '@packages/communication';

import { kafka } from '@root/lib/kafka';

const scheduleClient = new ScheduleClient(kafka);

const metadata: ClientCommandMetadata = {
  requestId: '1',
  user: {
    id: '1',
    roles: [CommandUserRole.User, CommandUserRole.Admin, CommandUserRole.OrganizationAdmin],
  },
};

export function getScheduleCommand(data: ScheduleTypes.GetScheduleRequest): Promise<ScheduleTypes.GetScheduleResponse> {
  return scheduleClient.getScheduleCommand(data, metadata);
}
