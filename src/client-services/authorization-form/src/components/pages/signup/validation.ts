import { yup } from 'lib/yup';

import { FormikSignUp } from 'stores';

export const validationSchema = yup.object().shape<FormikSignUp>({
  firstName: yup.string(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
