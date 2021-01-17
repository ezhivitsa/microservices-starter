import joi from 'joi';

import { userSchema } from './common';

import { RevokeTokenRequest } from '../types';

export const revokeTokenSchema = joi.object<RevokeTokenRequest>({
  accessToken: joi.string(),
  refreshToken: joi.string().required(),
  user: userSchema.required(),
});
