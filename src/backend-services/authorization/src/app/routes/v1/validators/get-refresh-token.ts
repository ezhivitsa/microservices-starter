import joi from 'joi';

import { GetRefreshTokenRequest } from '../types';

export const getRefreshTokenSchema = joi.object<GetRefreshTokenRequest>({
  refreshToken: joi.string().required(),
});
