import joi from 'joi';

import { validate } from 'lib/joi';

import { DeleteAppointmentParams } from '../types';

const schema = joi.object<DeleteAppointmentParams>({
  appointmentId: joi.string().required(),
});

export const deleteAppointmentValidator = validate(schema);
