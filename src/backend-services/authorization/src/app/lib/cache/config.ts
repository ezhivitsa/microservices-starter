import { ClientOpts } from 'redis';

const port = Number(process.env.REDIS_PORT) || 6379;
const host = process.env.REDIS_HOST || '127.0.0.1';
const password = process.env.REDIS_PASSWORD || undefined;

export const redisConfig: ClientOpts = {
  host,
  port,
  password,
};
