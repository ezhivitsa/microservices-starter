import joi from 'joi';

import { GetAccessTokenRequest } from '../types';

export const getAccessTokenSchema = joi.object<GetAccessTokenRequest>({
  accessToken: joi.string().required(),
});
