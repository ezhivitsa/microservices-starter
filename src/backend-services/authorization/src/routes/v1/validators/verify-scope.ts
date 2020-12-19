import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

import { timestampSchema, userSchema } from './common';

export const verifyScopeSchema = joi.object<AuthorizationTypes.VerifyScopeRequest>({
  accessToken: joi.string().required(),
  accessTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
