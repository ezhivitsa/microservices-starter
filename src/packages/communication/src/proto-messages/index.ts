import { AuthorizationCommand, authorizationCommandSchemas, AuthorizationTypes } from './authorization';
import { UserCommand, UserEvent, userCommandSchemas, userEventSchemas, UserTypes } from './users';
import { EmailCommand, emailCommandSchemas, EmailTypes } from './email';
import { CommonTypes } from './common';
import {
  AppointmentCommand,
  AppointmentEvent,
  appointmentCommandSchemas,
  appointmentEventSchemas,
  AppointmentTypes,
} from './appointments';

import { ChannelCommandSchema, ChannelEventSchema } from '../messages';

export type Command = AuthorizationCommand | UserCommand | EmailCommand | AppointmentCommand;

export type Event = UserEvent | AppointmentEvent;

export const commandSchemas: Record<string, ChannelCommandSchema> = {
  ...authorizationCommandSchemas,
  ...userCommandSchemas,
  ...emailCommandSchemas,
  ...appointmentCommandSchemas,
};

export const eventSchemas: Record<string, ChannelEventSchema> = {
  ...userEventSchemas,
  ...appointmentEventSchemas,
};

export {
  AuthorizationCommand,
  UserCommand,
  UserEvent,
  AuthorizationTypes,
  UserTypes,
  CommonTypes,
  EmailCommand,
  EmailTypes,
  AppointmentCommand,
  AppointmentEvent,
  AppointmentTypes,
};
