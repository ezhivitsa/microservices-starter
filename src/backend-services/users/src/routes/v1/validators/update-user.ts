import joi from 'joi';

import { UpdateUserRequest } from '../types';

export const getUserByAuthIdSchema = joi.object<UpdateUserRequest>({
  id: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string().required(),
});
