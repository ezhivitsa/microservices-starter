import { AppMiddleware, AppContext, Next } from 'koa';
import { Logger } from 'winston';

import { QueryParam } from '../../common/query-param';

export const featureFlagsMiddleware: AppMiddleware = (ctx: AppContext, next: Next): void => {
  const queryFeatures = ctx.query[QueryParam.FEATURES];
  const { config, logger } = ctx.state;

  ctx.state.featureFlagsSet = parseFeatureFlagsSetFromFeatures(
    queryFeatures?.toString(),
    config.featureFlagsDefault,
    config.featureFlagsSupported,
    logger,
  );

  next();
};

/**
 * Parse features from query parameters.
 * After this features can be passed through `:` optional parameter `on` or `off`.
 * - `on` adds feature into `ctx.state.featureFlagsSet` (default behavior);
 * - `off` removes feature from `ctx.state.featureFlagsSet` if
 *   it's enabled by default in `config.featureFlagsDefault`;
 * @param queryFeatures String like `feature1[:on|off],feature2[:on|off],...`
 * @param featureFlagsDefault
 * @param logger
 */
function parseFeatureFlagsSetFromFeatures<F extends string>(
  queryFeatures = '',
  featureFlagsDefault: F[],
  featureFlagsSupported: F[],
  logger: Logger,
): Set<F> {
  const queryFeaturesList = queryFeatures.split(',');

  const featureFlagsEnabledSet = new Set<F>(featureFlagsDefault);
  for (const featureString of queryFeaturesList) {
    const [featureFlag, state] = featureString.split(':') as [F, 'on' | 'off' | undefined];

    if (!featureFlag) {
      continue;
    }

    if (!featureFlagsSupported.includes(featureFlag)) {
      logger.warn('Unsupported feature flag passed', { featureFlag, featureString });
      continue;
    }

    if (state === 'off') {
      featureFlagsEnabledSet.delete(featureFlag);
    } else if (!state || state === 'on') {
      featureFlagsEnabledSet.add(featureFlag);
    } else {
      logger.warn('Unsupported feature flag state passed', { state, featureString });
    }
  }

  return featureFlagsEnabledSet;
}
