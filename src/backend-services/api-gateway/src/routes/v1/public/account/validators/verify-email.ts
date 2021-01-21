import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.VerifyEmailRequest>({
  token: joi.string().required(),
});

export const verifyEmailValidators = validate(schema);
