import { getMongo } from '@packages/mongo-storage';

import { initAppointmentEvent, initAppointmentSnapshot, initCommand, initCounter } from './models';
import { config } from './config';

const mongo = getMongo(config);

export const db = {
  mongo,
  AppointmentEvent: initAppointmentEvent(mongo),
  AppointmentSnapshot: initAppointmentSnapshot(mongo),
  Command: initCommand(mongo),
  Counter: initCounter(mongo),
};
