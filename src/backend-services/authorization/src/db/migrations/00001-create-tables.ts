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
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
