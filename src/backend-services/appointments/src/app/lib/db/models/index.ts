import { connect } from 'mongoose';
import { AppointmentEvent } from './appointment-event';
import { initCommand } from './command';

import { url, options } from '../config';

const mongo = connect(url, options);

const db = {
  AppointmentEvent,
  Command: initCommand(initAppointment),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
