import { appointmentsStorageService } from '@root/storage';

import { CreateAppointmentParams } from './types';

export async function createAppointment(params: CreateAppointmentParams): Promise<void> {
  await appointmentsStorageService.create({
    id: params.id,
    userId: params.userId,
    start: params.start,
    end: params.end,
    description: params.description || null,
  });
}
