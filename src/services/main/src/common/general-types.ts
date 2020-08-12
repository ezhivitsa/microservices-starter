import { FeatureFlag } from './feature-flags';

export interface SerializableClientConfig {
  readonly featureFlagsArray: FeatureFlag[];
  readonly frontUpstreams: FrontUpstreamsConfig;
}

export interface FrontUpstreamsConfig {
  readonly dashboard: string;
  readonly calendar: string;
}

export interface ClientConfig extends SerializableClientConfig {
  readonly featureFlagsSet: Set<FeatureFlag>;
}
