import { UserInstance, Role, UserAttributes, UserCreationAttributes } from 'db/models/user';
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
  roles: Role[];
}

interface UpdateData {
  roles: Role[];
}

export class UsersStorageService extends StorageService<UserInstance, Filter, CreateData, UpdateData, UpdateFilter> {
  _buildCreateValue(data: CreateData): UserCreationAttributes {
    return {
      email: data.email,
      password_hash: data.passwordHash,
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
    return {
      where: {
        id: filter.id,
        email: filter.email,
      },
    };
  }
}
