import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.CreateAppointmentRequest>({
  userId: joi.string().required(),
  start: joi.date().iso().required(),
  end: joi.date().iso().required(),
  description: joi.string().allow(''),
});

export const createAppointmentValidator = validate(schema);
