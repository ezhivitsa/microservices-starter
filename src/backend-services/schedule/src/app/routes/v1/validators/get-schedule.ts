import joi from 'joi';

import { GetScheduleRequest } from '../types';

import { timestampSchema } from './common';

export const getScheduleSchema = joi.object<GetScheduleRequest>({
  from: timestampSchema.required(),
  to: timestampSchema.required(),
});
