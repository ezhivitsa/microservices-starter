import { Version } from '@packages/communication';

import { UserRole } from './auth/types';

export interface MetadataUser {
  id: string;
  roles: UserRole[];
}

export interface Metadata {
  requestId: string;
  version: Version;
  responseChannel: string;
  user?: MetadataUser;
}
