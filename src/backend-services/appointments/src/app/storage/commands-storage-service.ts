import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';

import { CommandDocument, CommandModel } from '@root/lib/db/models/command';
import { db } from '@root/lib/db/models';

import { StorageService } from './storage-service';

interface Filter {
  id?: string;
}

interface CreateData {
  id: string;
}

export class CommandsStorageService extends StorageService<
  CommandDocument,
  Filter,
  CreateData,
  Record<string, unknown>,
  Record<string, unknown>
> {
  protected _Model: CommandModel = db.Command;

  protected _buildQuery(filter: Filter): FilterQuery<CommandDocument> {
    const query: FilterQuery<CommandDocument> = {};
    if (filter.id) {
      query._id = filter.id;
    }

    return query;
  }

  protected _buildCreateValue(data: CreateData): CommandDocument | DocumentDefinition<CommandDocument> {
    return {
      _id: data.id,
    };
  }

  protected _buildUpdateValues(): UpdateQuery<CommandDocument> {
    throw new Error('not implemented');
  }

  protected _buildUpdateWhere(): FilterQuery<CommandDocument> {
    throw new Error('not implemented');
  }
}
