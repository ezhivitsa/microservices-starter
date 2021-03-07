import { CommandUser } from '../kafka/types';

export interface ClientCommandMetadata {
  requestId: string;
  user?: CommandUser;
}
