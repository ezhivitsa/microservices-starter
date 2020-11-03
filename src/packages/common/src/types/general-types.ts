import { FeatureFlag } from './feature-flags';

export enum FrontApplication {
  Dashboard = 'dashboard',
  Auth = 'auth',
}

export interface FrontUpstream {
  name: string;
  jsUrl: string;
  cssUrl?: string;
  rule: string;
}

export type FrontUpstreamsConfig = Record<Readonly<FrontApplication>, FrontUpstream>;

export interface SerializableClientConfig {
  readonly featureFlagsArray: FeatureFlag[];
  readonly frontUpstreams: FrontUpstreamsConfig;
}

export interface ClientConfig extends SerializableClientConfig {
  readonly featureFlagsSet: Set<FeatureFlag>;
}
