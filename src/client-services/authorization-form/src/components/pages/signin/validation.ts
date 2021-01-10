import { yup } from 'lib/yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
