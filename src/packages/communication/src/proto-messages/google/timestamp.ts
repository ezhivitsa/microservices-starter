import { Long } from 'protobufjs';

export interface Timestamp {
  seconds: Long;
  nanos: number;
}
