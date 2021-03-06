import joi from 'joi';

import { DeleteAppointmentRequest } from '../types';

export const deleteAppointmentSchema = joi.object<DeleteAppointmentRequest>({
  id: joi.string().required(),
});
