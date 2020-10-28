import { Version } from './types';

export function getChannelKey(commandOrEvent: string, version: Version): string {
  return `${commandOrEvent}-${version}`;
}
