import { Options } from 'sequelize';

const port = Number(process.env.POSTGRES_PORT) || 5432;
const host = process.env.POSTGRES_HOST || '127.0.0.1';
const database = process.env.POSTGRES_DATABASE || 'authorization';
const username = process.env.POSTGRES_USER || 'starter';
const password = process.env.POSTGRES_PASSWORD || undefined;

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

const configs: {
  development: Options;
  staging: Options;
  test: Options;
  production: Options;
} = {
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

export { configs };
