export interface AssetsConfig {
  noCache: boolean;
}

export interface Config {
  readonly port: number;
  readonly useHttps: boolean;
  readonly buildPath: string;
  readonly staticUrl: string;
  readonly enableHotLoader: boolean;
  readonly assets: AssetsConfig;
  readonly apiPath: string;
}
