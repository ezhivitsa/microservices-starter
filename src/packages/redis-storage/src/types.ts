export interface Config {
  port: number;
  host: string;
  password?: string;
}

export interface CacheOptions {
  defaultExpire?: number;
}
