import joi from 'joi';

import { timestampSchema, userSchema } from './common';

import { SaveTokenRequest } from '../types';

export const saveTokenSchema = joi.object<SaveTokenRequest>({
  accessToken: joi.string().required(),
  accessTokenExpiresAt: timestampSchema.required(),
  refreshToken: joi.string().required(),
  refreshTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
