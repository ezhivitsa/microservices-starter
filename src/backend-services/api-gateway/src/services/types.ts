import { User } from 'koa';

export interface ServiceMetadata {
  requestId: string;
  user?: User;
}
