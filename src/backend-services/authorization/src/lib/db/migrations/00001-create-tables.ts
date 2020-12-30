import { DataTypes, QueryInterface } from 'sequelize';

enum Role {
  User = 'user',
  Admin = 'admin',
  OrganizationAdmin = 'organization-admin',
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
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
        type: DataTypes.ARRAY(DataTypes.ENUM({ values: [Role.User, Role.Admin, Role.OrganizationAdmin] })),
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
