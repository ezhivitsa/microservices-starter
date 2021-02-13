import { ServerConstants } from '@packages/common';

import { yup } from 'lib/yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .trim()
    .min(ServerConstants.minPasswordLength)
    .max(ServerConstants.maxPasswordLength)
    .required(),
});
