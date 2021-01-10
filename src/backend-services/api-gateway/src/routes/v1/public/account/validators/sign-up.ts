import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from 'constants/account-constants';

const schema = joi.object<ServiceTypes.SignUpRequest>({
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase(),
  password: joi.string().trim().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

export const signUpValidators = validate(schema);
