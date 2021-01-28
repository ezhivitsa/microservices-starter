import joi from 'joi';

import { SendForgotPasswordEmailRequest } from '../types';

export const sendForgotPasswordEmailSchema = joi.object<SendForgotPasswordEmailRequest>({
  email: joi.string().email().required(),
  token: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string().required(),
});
