import {Config} from '../types';

import {production} from './production';

export const staging: Config = {
    ...production
};
