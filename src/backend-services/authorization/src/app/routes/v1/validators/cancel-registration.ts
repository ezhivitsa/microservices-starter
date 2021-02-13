import joi from 'joi';

import { CancelRegistrationRequest } from '../types';

export const cancelRegistrationSchema = joi.object<CancelRegistrationRequest>({
  id: joi.string().required(),
});
