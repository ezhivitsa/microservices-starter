import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

export const registrationSchema = joi.object<AuthorizationTypes.RegistrationRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
  password: joi.string().trim().required(),
  owner: joi.boolean().required(),
});
