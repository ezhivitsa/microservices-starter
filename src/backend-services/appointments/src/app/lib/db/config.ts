import { Config } from '@packages/mongo-storage';

export const config: Config = {
  port: Number(process.env.MONGO_PORT) || 27017,
  host: process.env.MONGO_HOST || '127.0.0.1',
  database: process.env.MONGO_DATABASE || 'appointments',
  username: process.env.MONGO_USER || 'starter',
  password: process.env.MONGO_PASSWORD || '',
};
