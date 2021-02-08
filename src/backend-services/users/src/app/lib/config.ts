import { lib } from '@packages/server';

import { development } from '../configs/environment/development';
import { production } from '../configs/environment/production';
import { staging } from '../configs/environment/staging';
import { testing } from '../configs/environment/testing';

export const config = lib.initConfig({
  development,
  production,
  staging,
  testing,
});

export const { ENV, isDevelopment } = lib;
