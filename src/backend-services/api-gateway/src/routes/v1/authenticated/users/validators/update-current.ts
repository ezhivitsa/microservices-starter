import joi from 'joi';

import { ServiceTypes } from '@packages/common';

import { validate } from 'lib/joi';

const schema = joi.object<ServiceTypes.UpdateCurrentUserRequest>({
  firstName: joi.string().trim(),
  lastName: joi.string().trim().required(),
});

export const updateCurrentValidator = validate(schema);
