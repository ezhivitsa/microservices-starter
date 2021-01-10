import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.SignInRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase(),
  password: joi.string().trim(),
});

export const signInValidators = validate(schema);
