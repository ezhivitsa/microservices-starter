import { Optional, Model, DataTypes, Sequelize, ModelAttributes, ModelCtor } from '@packages/postgres-storage';

export interface CommandAttributes {
  id: string;
  createdAt: Date;
}

export type CommandCreationAttributes = Optional<CommandAttributes, 'createdAt'>;

export class CommandInstance extends Model<CommandAttributes, CommandCreationAttributes> implements CommandAttributes {
  public id!: string;
  public createdAt!: Date;
}

export type CommandModel = ModelCtor<CommandInstance>;

const commandAttributes: ModelAttributes = {
  id: {
    type: DataTypes.STRING(128),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export function initCommand(sequelize: Sequelize): CommandModel {
  return sequelize.define<CommandInstance>('commands', commandAttributes);
}
