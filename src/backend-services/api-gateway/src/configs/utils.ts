import assert from 'assert';

export const DEFAULT_PORT = process.env.NODEJS_PORT ? Number(process.env.NODEJS_PORT) : 8080;
export const HTTPS = Boolean(process.env.HTTPS);

assert(!isNaN(DEFAULT_PORT), 'Environment variable NODEJS_PORT must be an integer');
