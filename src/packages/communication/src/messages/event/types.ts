import { ProtoMessage } from '../proto';

import { Channel } from '../../channels';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EventSchema<T> {
  event: T;
  schema?: ProtoMessage<any>;
}

export interface ChannelEventSchema {
  channel: Channel;
  schema?: ProtoMessage<any>;
}
