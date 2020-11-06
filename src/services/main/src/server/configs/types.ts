import { Types } from '@packages/common';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly port: number;
  readonly useHttps: boolean;
  readonly logger: Readonly<LoggerConfig>;
  readonly featureFlagsSupported: Types.FeatureFlag[];
  readonly featureFlagsDefault: Types.FeatureFlag[];
  readonly buildPath: string;
  readonly staticUrl: string;
  readonly enableHotLoader: boolean;
  readonly requestIdHeader: string;
  readonly frontUpstreams: Types.FrontUpstreamsConfig;
  readonly apiGatewayUrl: string;
}
