import joi from 'joi';

import { GetCurrentUserRequest } from '../types';

export const getCurrentUserSchema = joi.object<GetCurrentUserRequest>({
  authId: joi.string().required(),
});
