import { yup } from 'lib/yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
