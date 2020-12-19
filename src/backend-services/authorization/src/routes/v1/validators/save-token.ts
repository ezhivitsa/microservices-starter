import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

import { timestampSchema, userSchema } from './common';

export const saveTokenSchema = joi.object<AuthorizationTypes.SaveTokenRequest>({
  accessToken: joi.string().required(),
  accessTokenExpiresAt: timestampSchema.required(),
  refreshToken: joi.string().required(),
  refreshTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
