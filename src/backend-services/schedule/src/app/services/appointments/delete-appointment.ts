import { appointmentsStorageService } from '@root/storage';

import { DeleteAppointmentParams } from './types';

export async function deleteAppointment(params: DeleteAppointmentParams): Promise<void> {
  await appointmentsStorageService.findByIdAndDelete(params.id);
}
