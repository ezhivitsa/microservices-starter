import _ from 'lodash';
import { WhereOptions, FindOptions } from 'sequelize';

import { StorageService } from '@packages/postgres-storage';

import { UserInstance, UserModel, UserAttributes, UserCreationAttributes } from '@root/lib/db/models/user';
import { UserRole } from '@root/lib/db/models/enums';
import { db } from '@root/lib/db';

interface Filter {
  id?: string;
  email?: string;
  signupToken?: string;
  resetPasswordToken?: string;
}

interface UpdateFilter {
  id?: string;
}

interface CreateData {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  roles: UserRole[];
  signupToken: string;
}

interface UpdateData {
  roles?: UserRole[];
  isEmailVerified?: boolean;
  passwordHash?: string;
  passwordSalt?: string;
  resetPasswordToken?: string | null;
}

export class UsersStorageService extends StorageService<UserInstance, Filter, CreateData, UpdateData, UpdateFilter> {
  _Model: UserModel = db.User;

  _buildCreateValue(data: CreateData): UserCreationAttributes {
    return {
      email: data.email,
      passwordHash: data.passwordHash,
      passwordSalt: data.passwordSalt,
      roles: data.roles,
      signupToken: data.signupToken,
      resetPasswordToken: null,
      isEmailVerified: false,
    };
  }

  _buildUpdateValues(data: UpdateData): Partial<UserAttributes> {
    return {
      roles: data.roles,
      isEmailVerified: data.isEmailVerified,
      resetPasswordToken: data.resetPasswordToken,
      passwordHash: data.passwordHash,
      passwordSalt: data.passwordSalt,
    };
  }

  _buildUpdateWhere(filter: UpdateFilter): WhereOptions<UserAttributes> {
    return {
      id: filter.id,
    };
  }

  _buildQuery(filter: Filter): FindOptions<UserAttributes> {
    const where = {
      id: filter.id,
      email: filter.email,
      signupToken: filter.signupToken,
      resetPasswordToken: filter.resetPasswordToken,
    };

    return {
      where: _.pickBy(where, (value) => value !== undefined),
    };
  }
}

export const usersStorageService = new UsersStorageService();
