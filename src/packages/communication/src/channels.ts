const REQUEST_CHANNEL = 'request';
const EVENT_CHANNEL = 'event';

export enum Channel {
  AUTHORIZATION = 'authorization',
  USERS = 'users',
  EMAIL = 'email',
  APPOINTMENTS = 'appointments',
  SCHEDULE = 'schedule',
}

export function getRequestChannel(channel: Channel): string {
  return `${channel}-${REQUEST_CHANNEL}`;
}

export function getEventChannel(channel: Channel): string {
  return `${channel}-${EVENT_CHANNEL}`;
}
