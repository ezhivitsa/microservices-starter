import { connect } from 'mongoose';
import { AppointmentEvent } from './appointment-event';
import { AppointmentSnapshot } from './appointment-snapshot';
import { Command } from './command';
import { Counter } from './counter';

import { url, options } from '../config';

const mongo = connect(url, options);

const db = {
  AppointmentEvent,
  AppointmentSnapshot,
  Command,
  Counter,
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
