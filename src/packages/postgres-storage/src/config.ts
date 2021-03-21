import { Options } from 'sequelize';

import { Config } from './types';

export const getConfigs = ({
  username,
  password,
  database,
  host,
  port,
}: Config): {
  development: Options;
  staging: Options;
  test: Options;
  production: Options;
} => {
  const databaseData: Options = {
    username,
    password,
    database,
    host,
    port,
    dialect: 'postgres',
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  };

  return {
    development: {
      ...databaseData,
    },
    staging: {
      ...databaseData,
    },
    test: {
      ...databaseData,
    },
    production: {
      ...databaseData,
    },
  };
};
