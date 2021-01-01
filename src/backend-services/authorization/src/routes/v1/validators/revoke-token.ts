import joi from 'joi';

import { timestampSchema, userSchema } from './common';

import { RevokeTokenRequest } from '../types';

export const revokeTokenSchema = joi.object<RevokeTokenRequest>({
  refreshToken: joi.string().required(),
  refreshTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
