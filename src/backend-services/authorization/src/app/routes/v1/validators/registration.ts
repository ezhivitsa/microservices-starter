import joi from 'joi';

import { RegistrationRequest } from '../types';

export const registrationSchema = joi.object<RegistrationRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
  password: joi.string().trim().required(),
  owner: joi.boolean().required(),
});
