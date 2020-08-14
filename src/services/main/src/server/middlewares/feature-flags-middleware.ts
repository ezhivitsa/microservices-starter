import { AppMiddleware } from 'koa';

import { middlewares } from '@packages/server';

import { QueryParam } from 'common/query-param';

import { config } from 'lib/config';

export const featureFlagsMiddleware: AppMiddleware = middlewares.prepareFeatureFlagsMiddleware(
  QueryParam.FEATURES,
  config.featureFlagsDefault,
  config.featureFlagsSupported,
);
