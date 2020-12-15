import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from 'sequelize';

import { UserRole } from './enums';

export interface UserAttributes {
  id: string;
  email: string;
  password_hash: string;
  password_salt: string;
  roles: UserRole[];
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class UserInstance extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password_hash!: string;
  public password_salt!: string;
  public roles!: UserRole[];
}

export type UserModel = ModelCtor<UserInstance>;

const userAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  password_salt: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.ENUM({ values: [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] })),
    allowNull: false,
  },
};

export function initUser(sequelize: Sequelize): UserModel {
  return sequelize.define<UserInstance>('user', userAttributes);
}
