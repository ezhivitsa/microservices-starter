import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from '@packages/postgres-storage';

export interface UserAttributes {
  id: string;
  firstName: string | null;
  lastName: string;
  email: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class UserInstance extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public firstName!: string | null;
  public lastName!: string;
  public email!: string;
}

export type UserModel = ModelCtor<UserInstance>;

const userAttributes: ModelAttributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export function initUser(sequelize: Sequelize): UserModel {
  return sequelize.define<UserInstance>('users', userAttributes);
}
