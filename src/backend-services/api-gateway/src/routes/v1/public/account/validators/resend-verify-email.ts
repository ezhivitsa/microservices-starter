import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.ResendVerifyEmailRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase(),
});

export const resendVerifyEmailValidators = validate(schema);
