import { Version } from './types';

interface ChannelKeyData {
  channel: string;
  commandOrEvent: string;
  version: Version;
}

export function getChannelKey({ channel, commandOrEvent, version }: ChannelKeyData): string {
  return `${channel}-${commandOrEvent}-${version}`;
}
