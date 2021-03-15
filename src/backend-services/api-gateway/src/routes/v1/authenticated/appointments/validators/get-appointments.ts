import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.GetAppointmentsRequest>({
  from: joi.date().iso().required(),
  to: joi.date().iso().required(),
});

export const getAppointmentsValidator = validate(schema);
