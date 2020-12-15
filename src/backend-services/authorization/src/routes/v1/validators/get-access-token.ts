import joi from 'joi';

import { AuthorizationTypes } from '@packages/communication';

export const getAccessTokenSchema = joi.object<AuthorizationTypes.GetAccessTokenRequest>({
  accessToken: joi.string().required(),
});
