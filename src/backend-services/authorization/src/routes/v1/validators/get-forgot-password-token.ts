import joi from 'joi';

import { GetForgotPasswordTokenRequest } from '../types';

export const getForgotPasswordTokenSchema = joi.object<GetForgotPasswordTokenRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
});
