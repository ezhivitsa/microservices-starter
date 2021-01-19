import joi from 'joi';

import { SendVerifyEmailRequest } from '../types';

export const sendVerifyEmailSchema = joi.object<SendVerifyEmailRequest>({
  token: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string().required(),
});
