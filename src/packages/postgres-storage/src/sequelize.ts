import { Sequelize } from 'sequelize';

import { getConfigs } from './config';
import { EnvType, Config } from './types';

export const getSequelize = (configData: Config, env: EnvType): Sequelize => {
  const configs = getConfigs(configData);
  const config = configs[env];

  return new Sequelize(config);
};
