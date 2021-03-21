import { getSequelize, EnvType } from '@packages/postgres-storage';

import { initUser, initCommand } from './models';
import { config } from './config';

const env = (process.env.NODE_ENV || EnvType.Development) as EnvType;
const sequelize = getSequelize(config, env);

const db = {
  sequelize,
  User: initUser(sequelize),
  Command: initCommand(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export { db };
