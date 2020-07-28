import {FeatureFlag} from '../../common/feature-flags';

export interface LoggerConfig {
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly port: number;
  readonly logger: Readonly<LoggerConfig>;
  readonly featureFlagsSupported: FeatureFlag[];
  readonly featureFlagsDefault: FeatureFlag[];
}
