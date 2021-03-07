import { connect, createConnection } from 'mongoose';
import { initAppointmentEvent } from './appointment-event';
import { initAppointmentSnapshot } from './appointment-snapshot';
import { initCommand } from './command';
import { initCounter } from './counter';

import { url, options } from '../config';

// export const mongo = createConnection(url, options);
connect(url, options);

export const db = {
  AppointmentEvent: initAppointmentEvent(), //mongo),
  AppointmentSnapshot: initAppointmentSnapshot(), //mongo),
  Command: initCommand(), //mongo),
  Counter: initCounter(), //mongo),
};
