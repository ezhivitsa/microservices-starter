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
      passwordHash: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      passwordSalt: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.ENUM({ values: [Role.User, Role.Admin, Role.OrganizationAdmin] })),
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
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.createTable('commands', {
      id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.addIndex('users', ['email'], { unique: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
