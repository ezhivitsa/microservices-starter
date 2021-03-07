import { AppointmentSnapshotData } from '@root/lib/db/models/appointment-snapshot';

import { appointmentsAggregateService } from '@root/storage';

export function getAppointmentData(id?: string): Promise<AppointmentSnapshotData | null> {
  return id ? appointmentsAggregateService.findById(id) : Promise.resolve(null);
}
