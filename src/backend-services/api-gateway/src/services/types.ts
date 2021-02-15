import { User } from 'koa';
import { Version } from '@packages/communication';

export interface ServiceMetadata {
  requestId: string;
  version: Version;
  responseChannel: string;
  user?: User;
}
