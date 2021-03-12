import { appointmentsStorageService } from '@root/storage';

import { UpdateAppointmentParams } from './types';

export async function updateAppointment(params: UpdateAppointmentParams): Promise<void> {
  await appointmentsStorageService.findByIdAndUpdate(params.id, {
    start: params.start,
    end: params.end,
    description: params.description || null,
  });
}
