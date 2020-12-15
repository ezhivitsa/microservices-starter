import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

export const getRefreshTokenSchema = joi.object<AuthorizationTypes.GetRefreshTokenRequest>({
  refreshToken: joi.string().required(),
});
