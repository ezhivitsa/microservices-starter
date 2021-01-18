import joi from 'joi';

import { VerifyEmailRequest } from '../types';

export const verifyEmailSchema = joi.object<VerifyEmailRequest>({
  token: joi.string().required(),
});
