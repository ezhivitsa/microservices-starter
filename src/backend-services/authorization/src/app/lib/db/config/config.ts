import { Config } from '@packages/postgres-storage';

export const config: Config = {
  port: Number(process.env.POSTGRES_PORT) || 5432,
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  database: process.env.POSTGRES_DATABASE || 'authorization',
  username: process.env.POSTGRES_USER || 'starter',
  password: process.env.POSTGRES_PASSWORD,
};
