import joi from 'joi';

import { CreateAppointmentRequest } from '../types';

import { timestampSchema } from './common';

export const createAppointmentSchema = joi.object<CreateAppointmentRequest>({
  userId: joi.string().required(),
  start: timestampSchema.required(),
  end: timestampSchema.required(),
  description: joi.string().allow(''),
});
