/* Here is the place where you can extend yup */

import * as yup from 'yup';

import { validation } from 'texts';

yup.setLocale({
  mixed: {
    required: validation.mixedRequired,
    default: validation.mixedDefault,
  },
  string: {
    email: validation.stringEmail,
    url: validation.stringUrl,
  },
});

export { yup };
