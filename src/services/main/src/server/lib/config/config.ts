import { Config } from '../../configs/types';

import { development } from '../../configs/environment/development';
import { production } from '../../configs/environment/production';
import { staging } from '../../configs/environment/staging';

import { ENV, Environment } from './environment';

const configsMap: Record<Environment, Config> = {
  development,
  production,
  staging,
};

function getConfig(env: Environment): [Environment, Config] {
  const config = configsMap[env];
  if (!config) {
    return [Environment.development, configsMap.development];
  }

  return [env, config];
}

const [env, config] = getConfig(ENV);
console.log(`INFO Using config for '${env}' environment`);

export { config };
