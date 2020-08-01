import { AppMiddleware, AppContext, Next } from 'koa';
import { Logger } from 'winston';

import { FeatureFlag } from '../../common/feature-flags';
import { QueryParam } from '../../common/query-param';

import { Config } from '../configs/types';

export const featureFlagsMiddleware: AppMiddleware = (ctx: AppContext, next: Next): void => {
  const queryFeatures = ctx.query[QueryParam.FEATURES];
  const { config, logger } = ctx.state;

  ctx.state.featureFlagsSet = parseFeatureFlagsSetFromFeatures(queryFeatures?.toString(), config, logger);

  next();
};

/**
 * Parse features from query parameters.
 * After this features can be passed through `:` optional parameter `on` или `off`.
 * - `on` adds feature into `ctx.state.featureFlagsSet` (default behavior);
 * - `off` removes feature from `ctx.state.featureFlagsSet` if
 *   it's enabled by default in `config.featureFlagsDefault`;
 * @param queryFeatures String like `feature1[:on|off],feature2[:on|off],...`
 * @param config
 * @param logger
 */
function parseFeatureFlagsSetFromFeatures(queryFeatures = '', config: Config, logger: Logger): Set<FeatureFlag> {
  const queryFeaturesList = queryFeatures.split(',');

  const featureFlagsEnabledSet = new Set<FeatureFlag>(config.featureFlagsDefault);
  for (const featureString of queryFeaturesList) {
    const [featureFlag, state] = featureString.split(':') as [FeatureFlag, 'on' | 'off' | undefined];

    if (!featureFlag) {
      continue;
    }

    if (!config.featureFlagsSupported.includes(featureFlag)) {
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
