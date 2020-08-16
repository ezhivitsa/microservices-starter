export enum Environment {
  production = 'production',
  staging = 'staging',
  development = 'development',
}

export const ENV = (process.env.OVERRIDE_ENV || process.env.NODE_ENV || Environment.development) as Environment;

export const isDevelopment = ENV === Environment.development;
