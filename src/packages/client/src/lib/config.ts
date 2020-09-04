import { Constants, Types } from '@packages/common';

const node = document.querySelector(`#${Constants.configId}`);

if (!node || !node.textContent) {
  throw new Error('Config node is empty');
}

const serializableConfig = JSON.parse(node.textContent) as Types.SerializableClientConfig;

const featureFlagsSet = new Set(serializableConfig.featureFlagsArray);

export const config: Types.ClientConfig = {
  ...serializableConfig,
  featureFlagsSet,
};
