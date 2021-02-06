import joi from 'joi';

import { timestampSchema, userSchema } from './common';

import { VerifyScopeRequest } from '../types';

export const verifyScopeSchema = joi.object<VerifyScopeRequest>({
  accessToken: joi.string().required(),
  accessTokenExpiresAt: timestampSchema.required(),
  user: userSchema.required(),
});
