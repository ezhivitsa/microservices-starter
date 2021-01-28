import joi from 'joi';

import { ResetPasswordRequest } from '../types';

export const resetPasswordSchema = joi.object<ResetPasswordRequest>({
  token: joi.string().required(),
  password: joi.string().required(),
});
