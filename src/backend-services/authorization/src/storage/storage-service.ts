import { Model } from 'sequelize';

import { ReadOnlyStorageService } from './read-only-storage-service';

interface Filter {
  id?: string;
}

export abstract class StorageService<
  M extends Model,
  F extends Filter,
  CD extends Record<string, any>,
  UD extends Record<string, any>
> extends ReadOnlyStorageService<M, F> {
  abstract _buildCreateValue(data: CD): M['_creationAttributes'];

  abstract _buildUpdateValues(data: UD): Partial<M['_attributes']>;

  create(data: CD): Promise<M> {
    return this._Model.create(data);
  }

  findAndUpdate() {}

  findByIdAndUpdate() {}
}
