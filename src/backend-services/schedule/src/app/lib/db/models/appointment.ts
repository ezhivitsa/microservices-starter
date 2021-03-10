import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from 'sequelize';

import { UserModel } from './user';

export interface AppointmentAttributes {
  id: string;
  userId: string;
  start: Date;
  end: Date;
  description: string | null;
}

export type AppointmentCreationAttributes = Optional<AppointmentAttributes, 'id'>;

export class AppointmentInstance
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes {
  public id!: string;
  public userId!: string;
  public start!: Date;
  public end!: Date;
  public description!: string | null;
}

export type AppointmentModel = ModelCtor<AppointmentInstance>;

const userAttributes: ModelAttributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
};

export function initAppointment(sequelize: Sequelize): AppointmentModel {
  return sequelize.define<AppointmentInstance>('appointments', userAttributes);
}
