export type Environment = 'production' | 'staging' | 'development';

export const ENV = (process.env.OVERRIDE_ENV || process.env.NODE_ENV || 'development') as Environment;
