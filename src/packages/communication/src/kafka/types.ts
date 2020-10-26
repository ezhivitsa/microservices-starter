import { Command, Event } from '../proto-messages';

export interface CommandMetadata {
  requestId: string;
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
  data?: any;
}

export interface ListenEventMessageData {
  id: string;
  event: Event;
  data?: any;
}

export type ListenCommandCallback = (message: ListenCommandMessageData) => void;
export type ListenEventCallback = (message: ListenEventMessageData) => void;

export enum Version {
  v1 = 'v1',
  v2 = 'v2',
}
