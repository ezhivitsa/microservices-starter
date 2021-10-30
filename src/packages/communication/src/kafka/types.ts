import { Command, Event } from '../proto-messages';
import { Version } from '../messages';
import { Channel } from '../channels';

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum CommandUserRole {
  User = 'user',
  Admin = 'admin',
  OrganizationAdmin = 'organization-admin',
}

export interface CommandUser {
  id: string;
  roles: CommandUserRole[];
}

export interface CommandMetadata {
  requestId: string;
  version: Version;
  user?: CommandUser;
}

export interface ReplyCommandMetadata {
  requestId: string;
  version: Version;
  responseChannel: string;
}

export interface EventMetadata {
  version: Version;
}

export interface CommandData<D> {
  data: D;
  channel: Channel;
  command: Command;
}

export interface ReplyData<D> extends CommandData<D> {
  correlationId: string;
}

export interface EventData<D> {
  data: D;
  channel: Channel;
  event: Event;
}

export interface ListenCommandMessageData {
  id: string;
  requestId: string;
  command: Command;
  version: Version;
  responseChannel: string;
  user?: CommandUser;
  data?: any;
}

export interface ListenEventMessageData {
  id: string;
  event: Event;
  version: Version;
  responseChannel: string;
  data?: any;
}

export type ListenCommandCallback = (message: ListenCommandMessageData) => void;
export type ListenEventCallback = (message: ListenEventMessageData) => void;
