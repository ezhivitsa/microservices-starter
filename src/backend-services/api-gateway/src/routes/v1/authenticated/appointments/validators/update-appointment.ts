import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

import { UpdateAppointmentParams } from '../types';

const schema = joi.object<ServiceTypes.UpdateAppointmentRequest & UpdateAppointmentParams>({
  appointmentId: joi.string().required(),
  start: joi.date().iso().required(),
  end: joi.date().iso().required(),
  description: joi.string().allow(''),
});

export const updateAppointmentValidator = validate(schema);
