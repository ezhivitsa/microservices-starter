import { ProtoMessage } from '../proto';

import { Channel } from '../../channels';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CommandSchema<T> {
  command: T;
  requestSchema?: ProtoMessage<any>;
  responseSchema?: ProtoMessage<any>;
  errorSchema?: ProtoMessage<any>;
}

export interface ChannelCommandSchema {
  channel: Channel;
  requestSchema?: ProtoMessage<any>;
  responseSchema?: ProtoMessage<any>;
  errorSchema?: ProtoMessage<any>;
}
