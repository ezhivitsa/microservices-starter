import { Constants, Types } from '@packages/common';

export function initConfig(configId = Constants.configId): Types.ClientConfig {
  const node = document.querySelector(`#${configId}`);

  if (!node || !node.textContent) {
    throw new Error('Config node is empty');
  }

  const serializableConfig = JSON.parse(node.textContent) as Types.SerializableClientConfig;

  const featureFlagsSet = new Set(serializableConfig.featureFlagsArray);

  return {
    ...serializableConfig,
    featureFlagsSet,
  };
}
