import { CommandUserRole } from '@packages/communication';
import { SessionUser } from '@packages/koa-kafka';

import { AppointmentTypes, AppointmentsService } from '@root/services';
import { AppointmentSnapshotData } from '@root/lib/db/models/appointment-snapshot';

import { appointmentsAggregateService } from '@root/storage';

export const testAppointment: AppointmentTypes.CreateAppointmentParams = {
  userId: '1',
  start: new Date(),
  end: new Date(),
  description: 'description',
};

const orgAdmin: SessionUser = new SessionUser({
  id: '1',
  roles: [CommandUserRole.User, CommandUserRole.Admin, CommandUserRole.OrganizationAdmin],
});

export function getAppointmentData(id?: string): Promise<AppointmentSnapshotData | null> {
  return id ? appointmentsAggregateService.findById(id) : Promise.resolve(null);
}

export async function createAppointment(data: Partial<AppointmentTypes.CreateAppointmentParams> = {}): Promise<string> {
  return AppointmentsService.createAppointment(
    {
      ...testAppointment,
      ...data,
    },
    { user: orgAdmin },
  );
}
