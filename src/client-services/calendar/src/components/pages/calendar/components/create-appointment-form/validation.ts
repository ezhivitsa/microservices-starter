import { yup } from 'lib/yup';

export const validationSchema = yup.object().shape({
  userId: yup.string().required(),
  start: yup.date().required(),
  end: yup.date().required(),
  description: yup.string(),
});
