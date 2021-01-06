import { FeatureFlag } from './feature-flags';

export enum FrontApplication {
  Dashboard = 'dashboard',
  Auth = 'auth',
  Settings = 'settings',
}

export enum ApplicationLayout {
  Default = 'default',
  Empty = 'empty',
}

export interface FrontUpstream {
  name: string;
  jsUrl: string;
  cssUrl?: string;
  rule: string;
  layout: ApplicationLayout;
}

export type FrontUpstreamsConfig = Record<Readonly<FrontApplication>, FrontUpstream>;

export interface SerializableClientConfig {
  readonly featureFlagsArray: FeatureFlag[];
  readonly frontUpstreams: FrontUpstreamsConfig;
  readonly apiGatewayUrl: string;
}

export interface ClientConfig extends SerializableClientConfig {
  readonly featureFlagsSet: Set<FeatureFlag>;
}
