import joi from 'joi';

import { GetUserRequest } from '../types';

export const getUserSchema = joi.object<GetUserRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
  password: joi.string().trim().required(),
});
