import { FeatureFlag } from 'common/feature-flags';
import { FrontUpstreamsConfig } from 'common/general-types';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly port: number;
  readonly logger: Readonly<LoggerConfig>;
  readonly featureFlagsSupported: FeatureFlag[];
  readonly featureFlagsDefault: FeatureFlag[];
  readonly buildPath: string;
  readonly staticUrl: string;
  readonly enableHotLoader: boolean;
  readonly requestIdHeader: string;
  readonly frontUpstreams: FrontUpstreamsConfig;
  readonly frontUpstreamRules: FrontUpstreamsConfig;
}
