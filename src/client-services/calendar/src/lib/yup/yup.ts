/* Here is the place where you can extend yup */

import * as yup from 'yup';

import { validationTexts } from 'texts';

yup.setLocale({
  mixed: {
    required: validationTexts.mixedRequired,
    default: validationTexts.mixedDefault,
  },
  string: {
    url: validationTexts.stringUrl,
  },
});

export { yup };
