import { Command, Event } from '../proto-messages';
import { Version } from '../messages';

export interface CommandMetadata {
  requestId: string;
  version: Version;
}

export interface EventMetadata {
  version: Version;
}

export interface CommandData<D> {
  data: D;
  command: Command;
}

export interface ReplyData<D> extends CommandData<D> {
  correlationId: string;
}

export interface EventData<D> {
  data: D;
  event: Event;
}

export interface ListenCommandMessageData {
  id: string;
  requestId: string;
  command: Command;
  version: Version;
  data?: any;
}

export interface ListenEventMessageData {
  id: string;
  event: Event;
  version: Version;
  data?: any;
}

export type ListenCommandCallback = (message: ListenCommandMessageData) => void;
export type ListenEventCallback = (message: ListenEventMessageData) => void;
