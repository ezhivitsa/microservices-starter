import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

export const getUserSchema = joi.object<AuthorizationTypes.GetUserRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
  password: joi.string().trim().required(),
});
