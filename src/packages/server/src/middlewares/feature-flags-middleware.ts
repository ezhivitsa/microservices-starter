import { AppMiddleware, AppContext, Next } from 'koa';

import { parseFeatureFlagsSetFromFeatures } from '../lib/feature-flags';

export function prepareFeatureFlagsMiddleware<F extends string>(
  queryParam: string,
  featureFlagsDefault: F[],
  featureFlagsSupported: F[],
): AppMiddleware {
  return (ctx: AppContext, next: Next): void => {
    const queryFeatures = ctx.query[queryParam];
    const { logger } = ctx.state;

    ctx.state.featureFlagsSet = parseFeatureFlagsSetFromFeatures(
      queryFeatures?.toString(),
      featureFlagsDefault,
      featureFlagsSupported,
      logger,
    );

    next();
  };
}
