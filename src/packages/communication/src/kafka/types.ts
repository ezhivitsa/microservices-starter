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

export type CommandHandler = <D, R>(data: D, messageId: string) => Promise<R>;
export type EventHandler = <D>(data: D, eventId: string) => void;
