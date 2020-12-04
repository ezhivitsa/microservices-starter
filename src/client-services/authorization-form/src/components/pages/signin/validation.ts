import { yup } from 'lib/yup';

import { FormikSignIn } from 'stores';

export const validationSchema = yup.object().shape<FormikSignIn>({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
