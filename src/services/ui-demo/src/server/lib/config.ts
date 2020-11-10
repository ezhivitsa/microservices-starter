import { lib } from '@packages/server';

import { development } from '../configs/environment/development';
import { production } from '../configs/environment/production';
import { staging } from '../configs/environment/staging';

export const config = lib.initConfig({
  development,
  production,
  staging,
});

export const { ENV, isDevelopment } = lib;
