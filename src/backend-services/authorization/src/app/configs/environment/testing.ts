import { Config } from '../types';

import { development } from './development';

export const testing: Config = {
  ...development,
  kafkaMock: true,
};
