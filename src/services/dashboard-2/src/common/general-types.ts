import { FeatureFlag } from './feature-flags';

export interface SerializableClientConfig {
  readonly featureFlagsArray: FeatureFlag[];
  readonly appBasePath: string;
}

export interface ClientConfig extends SerializableClientConfig {
  readonly featureFlagsSet: Set<FeatureFlag>;
}
