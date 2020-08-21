import { FeatureFlag } from './feature-flags';

export interface FrontUpstreamsConfig {
  readonly dashboard: string;
  readonly calendar: string;
}

export interface SerializableClientConfig {
  readonly featureFlagsArray: FeatureFlag[];
  readonly frontUpstreams: FrontUpstreamsConfig;
  readonly frontUpstreamRules: FrontUpstreamsConfig;
}

export interface ClientConfig extends SerializableClientConfig {
  readonly featureFlagsSet: Set<FeatureFlag>;
}
