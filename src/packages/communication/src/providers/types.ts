import { Version } from '../messages';

export interface CommandMetadata {
  requestId: string;
  version: Version;
  responseChannel: string;
}

export interface EventMetadata {
  version: Version;
}
