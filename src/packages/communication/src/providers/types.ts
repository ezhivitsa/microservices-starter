import { Version } from '../messages';

export interface CommandMetadata {
  requestId: string;
  version: Version;
}

export interface EventMetadata {
  version: Version;
}
