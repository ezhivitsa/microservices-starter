import joi from 'joi';

import { GetUserByAuthIdRequest } from '../types';

export const getUserByAuthIdSchema = joi.object<GetUserByAuthIdRequest>({
  authId: joi.string().required(),
});
