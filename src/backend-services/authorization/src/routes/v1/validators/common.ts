import joi from 'joi';
import Long from 'long';

import { Timestamp } from '@packages/proto';

import { User } from '../types';

export const longSchema = joi.object<Long>({
  low: joi.number().required(),
  high: joi.number().required(),
  unsigned: joi.boolean().required(),
});

export const timestampSchema = joi.object<Timestamp>({
  seconds: longSchema.required(),
  nanos: joi.number().required(),
});

export const userSchema = joi.object<User>({
  id: joi.string().required(),
});
