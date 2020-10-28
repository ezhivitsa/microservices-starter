import { Message, IHeaders } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { commandSchemas, eventSchemas } from '../proto-messages';

import {
  COMMAND_HEADER,
  COMMAND_MESSAGE_ID_HEADER,
  COMMAND_REQUEST_ID_HEADER,
  REPLY_CORRELATION_ID_HEADER,
  REPLY_ERROR,
  EVENT_HEADER,
  EVENT_ID_HEADER,
  VERSION_HEADER,
} from './constants';

import { CommandData, CommandMetadata, EventMetadata, ReplyData, EventData } from './types';
import { KafkaHandlerError } from './errors';

export function getCommandMessage<D>(
  commandData: CommandData<D>,
  metadata: CommandMetadata,
): {
  message: Message;
  id: string;
} {
  const commandSchema = commandSchemas[commandData.command];

  const messageId = uuidv4();

  const message = {
    value: commandSchema.requestSchema?.encode(commandData.data) || null,
    headers: {
      [COMMAND_MESSAGE_ID_HEADER]: messageId,
      [COMMAND_REQUEST_ID_HEADER]: metadata.requestId,
      [COMMAND_HEADER]: commandData.command,
      [VERSION_HEADER]: metadata.version,
    },
  };

  return {
    id: messageId,
    message,
  };
}

export function getCommandReplyMessage<D>(replyData: ReplyData<D>, metadata: CommandMetadata): Message {
  const commandSchema = commandSchemas[replyData.command];

  return {
    value: replyData.data ? commandSchema.requestSchema?.encode(replyData.data) || null : null,
    headers: {
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
  const commandSchema = commandSchemas[replyErrorData.command];

  return {
    value: commandSchema.errorSchema?.encode(replyErrorData.data.errorData) || null,
    headers: {
      [COMMAND_REQUEST_ID_HEADER]: metadata.requestId,
      [COMMAND_HEADER]: replyErrorData.command,
      [REPLY_CORRELATION_ID_HEADER]: replyErrorData.correlationId,
      [REPLY_ERROR]: true.toString(),
      [VERSION_HEADER]: metadata.version,
    },
  };
}

export function getEventMessage<D>(eventData: EventData<D>, metadata: EventMetadata): Message {
  const eventSchema = eventSchemas[eventData.event];

  const eventId = uuidv4();

  return {
    value: eventSchema.schema?.encode(eventData.data) || null,
    headers: {
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
