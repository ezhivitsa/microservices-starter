import _ from 'lodash';

import {
  CommandInstance,
  CommandModel,
  CommandAttributes,
  CommandCreationAttributes,
} from '@root/lib/db/models/command';
import db from '@root/lib/db/models';
import { WhereOptions, FindOptions } from 'sequelize/types';

import { StorageService } from './storage-service';

interface Filter {
  id?: string;
}

interface CreateData {
  id: string;
}

export class CommandsStorageService extends StorageService<
  CommandInstance,
  Filter,
  CreateData,
  Record<string, unknown>,
  Record<string, unknown>
> {
  _Model: CommandModel = db.Command;

  _buildCreateValue(data: CreateData): CommandCreationAttributes {
    return {
      id: data.id,
    };
  }

  _buildUpdateValues(): Partial<CommandAttributes> {
    throw new Error('Not implemented');
  }

  _buildUpdateWhere(): WhereOptions<CommandAttributes> {
    throw new Error('Not implemented');
  }

  _buildQuery(filter: Filter): FindOptions<CommandAttributes> {
    const where = {
      id: filter.id,
    };

    return {
      where: _.pickBy(where, (value) => value !== undefined),
    };
  }
}

export const commandsStorageService = new CommandsStorageService();
