import { UserRole } from './auth/types';

export interface MetadataUser {
  id: string;
  roles: UserRole[];
}

export interface Metadata {
  requestId: string;
  user?: MetadataUser;
}
