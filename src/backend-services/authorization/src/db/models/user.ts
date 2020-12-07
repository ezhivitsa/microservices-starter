import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from 'sequelize';

export enum Role {
  User = 'user',
  Admin = 'admin',
  OrganizationAdmin = 'organization-admin',
}

export interface UserAttributes {
  id: string;
  email: string;
  password_hash: string;
  roles: Role[];
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class UserInstance extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password_hash!: string;
  public roles!: Role[];
}

export type UserModel = ModelCtor<UserInstance>;

const userAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password_hash: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  roles: {
    type: new DataTypes.ENUM(Role.User, Role.Admin, Role.OrganizationAdmin),
    allowNull: false,
  },
};

export function initUser(sequelize: Sequelize): UserModel {
  return sequelize.define<UserInstance>('user', userAttributes);
}
