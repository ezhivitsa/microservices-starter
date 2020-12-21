import { Version } from '@packages/communication';

export interface Metadata {
  requestId: string;
  version: Version;
  responseChannel: string;
}
