const REQUEST_CHANNEL = 'request';
const REPLY_CHANNEL = 'reply';
const EVENT_CHANNEL = 'event';

export enum Channel {
  AUTHORIZATION = 'authorization',
}

export function getRequestChannel(channel: Channel): string {
  return `${channel}-${REQUEST_CHANNEL}`;
}

export function getReplyChannel(channel: Channel): string {
  return `${channel}-${REPLY_CHANNEL}`;
}

export function getEventChannel(channel: Channel): string {
  return `${channel}-${EVENT_CHANNEL}`;
}
