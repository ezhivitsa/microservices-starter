import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      authId: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
      createdAt: { type: DataTypes.DATE, allowNull: true },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    });

    await queryInterface.createTable('commands', {
      id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: true },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
