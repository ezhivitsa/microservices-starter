import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

import { timestampSchema, userSchema } from './common';

export const revokeTokenSchema = joi.object<AuthorizationTypes.RevokeTokenRequest>({
  refreshToken: joi.string().required(),
  refreshTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
