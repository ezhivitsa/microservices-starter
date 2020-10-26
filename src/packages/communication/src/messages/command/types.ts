import { ProtoMessage } from '../proto';
import { Version } from '../types';

import { Channel } from '../../channels';

export interface CommandSchema<T> {
  command: T;
  requestSchema?: ProtoMessage<any>;
  responseSchema?: ProtoMessage<any>;
}

export interface ChannelCommandSchema {
  channel: Channel;
  requestSchema?: ProtoMessage<any>;
  responseSchema?: ProtoMessage<any>;
  errorSchema?: ProtoMessage<any>;
}

export interface CommandKey<C extends string> {
  command: C;
  version: Version;
}
