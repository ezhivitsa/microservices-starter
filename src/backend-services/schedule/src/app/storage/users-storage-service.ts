import _ from 'lodash';
import { WhereOptions, FindOptions } from '@packages/postgres-storage';

import { StorageService } from '@packages/postgres-storage';

import { UserInstance, UserModel, UserAttributes, UserCreationAttributes } from '@root/lib/db/models/user';
import { db } from '@root/lib/db';

interface Filter {
  id?: string;
}

interface UpdateFilter {
  id?: string;
}

interface CreateData {
  id: string;
  firstName: string | null;
  lastName: string;
  email: string;
}

interface UpdateData {
  firstName?: string | null;
  lastName?: string;
  email?: string;
}

export class UsersStorageService extends StorageService<UserInstance, Filter, CreateData, UpdateData, UpdateFilter> {
  _Model: UserModel = db.User;

  _buildCreateValue(data: CreateData): UserCreationAttributes {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }

  _buildUpdateValues(data: UpdateData): Partial<UserAttributes> {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
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
    };

    return {
      where: _.pickBy(where, (value) => value !== undefined),
    };
  }
}

export const usersStorageService = new UsersStorageService();
