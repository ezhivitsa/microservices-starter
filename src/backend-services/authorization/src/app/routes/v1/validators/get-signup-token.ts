import joi from 'joi';

import { GetSignupTokenRequest } from '../types';

export const getSignupTokenSchema = joi.object<GetSignupTokenRequest>({
  email: joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
});
