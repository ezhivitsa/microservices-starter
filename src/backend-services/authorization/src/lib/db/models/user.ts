import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from 'sequelize';

import { UserRole } from './enums';

export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  roles: UserRole[];
  isEmailVerified: boolean;
  signupToken: string;
  resetPasswordToken: string | null;
  createdAt: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt'>;

export class UserInstance extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public passwordSalt!: string;
  public roles!: UserRole[];
  public isEmailVerified!: boolean;
  public signupToken!: string;
  public resetPasswordToken!: string | null;
  public createdAt!: Date;
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
  passwordHash: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  passwordSalt: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.ENUM({ values: [UserRole.User, UserRole.Admin, UserRole.OrganizationAdmin] })),
    allowNull: false,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  signupToken: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export function initUser(sequelize: Sequelize): UserModel {
  return sequelize.define<UserInstance>('users', userAttributes);
}
