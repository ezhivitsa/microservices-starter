import { Command, Event } from '../proto-messages';

export interface CommandMetadata {
  requestId: string;
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

export type CommandHandler = <D, R>(data: D, messageId: string) => Promise<R>;
export type EventHandler = <D>(data: D, eventId: string) => void;

export type ListenCommandCallback = (message: ListenCommandMessageData) => void;
export type ListenEventCallback = (message: ListenEventMessageData) => void;
