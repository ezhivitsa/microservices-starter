import { AppMiddleware } from 'koa';

import { middlewares } from '@packages/server';
import { Types } from '@packages/common';

import { config } from 'lib/config';

export const featureFlagsMiddleware: AppMiddleware = middlewares.prepareFeatureFlagsMiddleware(
  Types.QueryParam.FEATURES,
  config.featureFlagsDefault,
  config.featureFlagsSupported,
);
