import { ProtoMessage } from '../proto';
import { Version } from '../types';

import { Channel } from '../../channels';

export interface EventSchema<T> {
  event: T;
  schema?: ProtoMessage<any>;
}

export interface ChannelEventSchema {
  channel: Channel;
  schema?: ProtoMessage<any>;
}

export interface EventKey<E extends string> {
  event: E;
  version: Version;
}
