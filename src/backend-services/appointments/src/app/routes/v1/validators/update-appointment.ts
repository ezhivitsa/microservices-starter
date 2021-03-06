import joi from 'joi';

import { UpdateAppointmentRequest } from '../types';

import { timestampSchema } from './common';

export const updateAppointmentSchema = joi.object<UpdateAppointmentRequest>({
  id: joi.string().required(),
  start: timestampSchema.required(),
  end: timestampSchema.required(),
  description: joi.string().allow(''),
});
