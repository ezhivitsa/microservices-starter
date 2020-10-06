import { ProtoMessage } from '../proto';

import { Channel } from '../../channels';

export interface EventSchema {
  schema?: ProtoMessage<any>;
}

export interface ChannelEventSchema extends EventSchema {
  channel: Channel;
}
