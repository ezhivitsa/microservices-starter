import { ProtoMessage } from '../proto';

import { Channel } from '../../channels';

export interface CommandSchema {
  requestSchema?: ProtoMessage<any>;
  responseSchema?: ProtoMessage<any>;
}

export interface ChannelCommandSchema extends CommandSchema {
  channel: Channel;
  errorSchema?: ProtoMessage<any>;
}
