import { SerializableClientConfig, ClientConfig } from 'common/general-types';

const node = document.querySelector('.dashboard-config-view');

if (!node || !node.textContent) {
  throw new Error('Config node is empty');
}

const serializableConfig = JSON.parse(node.textContent) as SerializableClientConfig;

const featureFlagsSet = new Set(serializableConfig.featureFlagsArray);

export const config: ClientConfig = {
  ...serializableConfig,
  featureFlagsSet,
};
