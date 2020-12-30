import _ from 'lodash';

import { UserInstance, UserModel, UserAttributes, UserCreationAttributes } from 'lib/db/models/user';
import { UserRole } from 'lib/db/models/enums';
import db from 'lib/db/models';
import { WhereOptions, FindOptions } from 'sequelize/types';

import { StorageService } from './storage-service';

interface Filter {
  id?: string;
  email?: string;
}

interface UpdateFilter {
  id?: string;
}

interface CreateData {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  roles: UserRole[];
}

interface UpdateData {
  roles: UserRole[];
}

export class UsersStorageService extends StorageService<UserInstance, Filter, CreateData, UpdateData, UpdateFilter> {
  _Model: UserModel = db.User;

  _buildCreateValue(data: CreateData): UserCreationAttributes {
    return {
      email: data.email,
      password_hash: data.passwordHash,
      password_salt: data.passwordSalt,
      roles: data.roles,
    };
  }

  _buildUpdateValues(data: UpdateData): Partial<UserAttributes> {
    return {
      roles: data.roles,
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
    };

    return {
      where: _.pickBy(where, (value) => value !== undefined),
    };
  }
}

export const usersStorageService = new UsersStorageService();
