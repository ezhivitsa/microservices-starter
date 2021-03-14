import joi from 'joi';

import { validate } from 'lib/joi';

import { GetAppointmentsQueryParams } from '../types';

const schema = joi.object<GetAppointmentsQueryParams>({
  from: joi.date().iso().required(),
  to: joi.date().iso().required(),
});

export const getAppointmentsValidator = validate(schema);
