import { yup } from 'lib/yup';

export const validationSchema = yup.object().shape({
  password: yup.string().required(),
});
