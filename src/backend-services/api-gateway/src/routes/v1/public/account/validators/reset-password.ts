import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.ResetPasswordRequest>({
  token: joi.string().required(),
});

export const resetPasswordValidators = validate(schema);
