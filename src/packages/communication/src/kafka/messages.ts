import { Message, IHeaders } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { commandSchemas, eventSchemas } from '../proto-messages';

import { getChannelKey } from '../messages';

import {
  CHANNEL_HEADER,
  COMMAND_HEADER,
  COMMAND_MESSAGE_ID_HEADER,
  COMMAND_REQUEST_ID_HEADER,
  COMMAND_USER_HEADER,
  REPLY_CORRELATION_ID_HEADER,
  REPLY_ERROR,
  EVENT_HEADER,
  EVENT_ID_HEADER,
  VERSION_HEADER,
  RESPONSE_CHANNEL_HEADER,
} from './constants';

import { CommandData, CommandMetadata, EventMetadata, ReplyData, EventData } from './types';
import { KafkaHandlerError } from './errors';

export function getCommandMessage<D>(
  commandData: CommandData<D>,
  responseChannel: string,
  metadata: CommandMetadata,
): {
  message: Message;
  id: string;
} {
  const commandSchema =
    commandSchemas[
      getChannelKey({
        channel: commandData.channel,
        commandOrEvent: commandData.command,
        version: metadata.version,
      })
    ];
  const messageId = uuidv4();

  const message: Message = {
    value: commandSchema.requestSchema?.encode(commandData.data) || null,
    headers: {
      [CHANNEL_HEADER]: commandData.channel,
      [COMMAND_MESSAGE_ID_HEADER]: messageId,
      [COMMAND_REQUEST_ID_HEADER]: metadata.requestId,
      [COMMAND_HEADER]: commandData.command,
      [VERSION_HEADER]: metadata.version,
      [RESPONSE_CHANNEL_HEADER]: responseChannel,
    },
  };

  if (metadata.user && message.headers) {
    message.headers[COMMAND_USER_HEADER] = JSON.stringify(metadata.user);
  }

  return {
    id: messageId,
    message,
  };
}

export function getCommandReplyMessage<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Message {
  const commandSchema =
    commandSchemas[
      getChannelKey({
        channel: replyData.channel,
        commandOrEvent: replyData.command,
        version: metadata.version,
      })
    ];

  return {
    value: replyData.data ? commandSchema.responseSchema?.encode(replyData.data) || null : null,
    headers: {
      [CHANNEL_HEADER]: replyData.channel,
      [COMMAND_REQUEST_ID_HEADER]: metadata.requestId,
      [REPLY_CORRELATION_ID_HEADER]: replyData.correlationId,
      [COMMAND_HEADER]: replyData.command,
      [VERSION_HEADER]: metadata.version,
    },
  };
}

export function getCommandReplyErrorMessage(
  replyErrorData: ReplyData<KafkaHandlerError>,
  metadata: CommandMetadata,
): Message {
  const commandSchema =
    commandSchemas[
      getChannelKey({
        channel: replyErrorData.channel,
        commandOrEvent: replyErrorData.command,
        version: metadata.version,
      })
    ];

  return {
    value: replyErrorData.data.errorData
      ? commandSchema.errorSchema?.encode(replyErrorData.data.errorData) || null
      : null,
    headers: {
      [CHANNEL_HEADER]: replyErrorData.channel,
      [COMMAND_REQUEST_ID_HEADER]: metadata.requestId,
      [COMMAND_HEADER]: replyErrorData.command,
      [REPLY_CORRELATION_ID_HEADER]: replyErrorData.correlationId,
      [REPLY_ERROR]: true.toString(),
      [VERSION_HEADER]: metadata.version,
    },
  };
}

export function getEventMessage<D>(eventData: EventData<D>, metadata: EventMetadata): Message {
  const eventSchema =
    eventSchemas[
      getChannelKey({
        channel: eventData.channel,
        commandOrEvent: eventData.event,
        version: metadata.version,
      })
    ];

  const eventId = uuidv4();

  return {
    value: eventSchema.schema?.encode(eventData.data) || null,
    headers: {
      [CHANNEL_HEADER]: eventData.channel,
      [EVENT_HEADER]: eventData.event,
      [EVENT_ID_HEADER]: eventId,
      [VERSION_HEADER]: metadata.version,
    },
  };
}

export function isMessageCommand(headers: IHeaders): boolean {
  return headers.hasOwnProperty(COMMAND_HEADER) && headers.hasOwnProperty(COMMAND_MESSAGE_ID_HEADER);
}

export function isMessageReply(headers: IHeaders): boolean {
  return headers.hasOwnProperty(COMMAND_HEADER) && headers.hasOwnProperty(REPLY_CORRELATION_ID_HEADER);
}

export function isMessageEvent(headers: IHeaders): boolean {
  return headers.hasOwnProperty(EVENT_HEADER) && headers.hasOwnProperty(EVENT_ID_HEADER);
}

export function isMessageReplyError(headers: IHeaders): boolean {
  return isMessageReply(headers) && headers.hasOwnProperty(REPLY_ERROR);
}
