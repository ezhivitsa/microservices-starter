import { connect } from 'mongoose';
import { initAppointment } from './appointment';
import { initCommand } from './command';

import { url, options } from '../config';

const mongo = connect(url, options);

const db = {
  sequelize,
  Sequelize,
  User: initAppointment(initAppointment),
  Command: initCommand(initAppointment),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
