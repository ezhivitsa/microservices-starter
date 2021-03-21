export enum EnvType {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export interface Config {
  port: number;
  host: string;
  database: string;
  username: string;
  password?: string;
}
