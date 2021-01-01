import joi from 'joi';

import { RegistrationRequest } from '../types';

export const registrationSchema = joi.object<RegistrationRequest>({
  authId: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
  firstName: joi.string(),
  lastName: joi.string().required(),
});
