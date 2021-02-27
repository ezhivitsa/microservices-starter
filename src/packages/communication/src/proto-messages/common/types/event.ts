import { Timestamp } from '../../google';

export interface EventMeta {
  createdAt?: Timestamp;
  userId?: string;
}
