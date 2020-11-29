import joi from 'joi';

import { validate } from 'lib/joi';

const schema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase(),
  password: joi.string().trim(),
});

export const signInValidators = validate(schema);
