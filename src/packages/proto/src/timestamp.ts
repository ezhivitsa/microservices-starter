import { fromNumber as longFromNumber } from 'long';
import { Long } from 'protobufjs';

export function castDateToTimestamp(date: Date): Timestamp {
  const milliseconds = date.valueOf();
  return {
    seconds: longFromNumber(Math.floor(milliseconds / 1000)),
    nanos: 0,
  };
}

export function castISOStringToTimestamp(date: string): Timestamp {
  return castDateToTimestamp(new Date(date));
}

export function castTimestampToDate(timestamp: Timestamp): Date {
  const milliseconds = Number(timestamp.seconds.toString()) * 1000;

  return new Date(milliseconds);
}

export function castTimestampToISOString(timestamp: Timestamp): string {
  return castTimestampToDate(timestamp).toISOString();
}

export interface Timestamp {
  seconds: Long;
  nanos: number;
}
