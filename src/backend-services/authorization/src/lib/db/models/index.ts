import { Sequelize, Options } from 'sequelize';
import { initUser } from './user';

import { configs } from '../config/config';

type EnvType = 'development' | 'staging' | 'production';

const env = (process.env.NODE_ENV || 'development') as EnvType;
const config = configs[env] as Options;

const sequelize = new Sequelize(config);

const db = {
  sequelize,
  Sequelize,
  User: initUser(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
