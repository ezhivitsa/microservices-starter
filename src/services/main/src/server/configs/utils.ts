import assert from 'assert';

export const DEFAULT_PORT = process.env.MAPS_NODEJS_PORT ? Number(process.env.MAPS_NODEJS_PORT) : 8080;

assert(!isNaN(DEFAULT_PORT), 'Environment variable MAPS_NODEJS_PORT must be an integer');
