import {
  AuthorizationClient,
  UsersClient,
  EmailClient,
  AppointmentsClient,
  ScheduleClient,
} from '@packages/communication';

import { kafka } from './kafka';

export const authorizationClient = new AuthorizationClient(kafka);
export const usersClient = new UsersClient(kafka);
export const emailClient = new EmailClient(kafka);
export const appointmentsClient = new AppointmentsClient(kafka);
export const scheduleClient = new ScheduleClient(kafka);
