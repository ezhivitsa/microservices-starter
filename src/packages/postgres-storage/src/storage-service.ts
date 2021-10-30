import { Model, WhereOptions } from 'sequelize';

import { ReadOnlyStorageService } from './read-only-storage-service';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Filter {
  id?: string;
}

interface UpdateFilter {
  id?: string;
}

export abstract class StorageService<
  M extends Model,
  F extends Filter,
  CD extends Record<string, any>,
  UD extends Record<string, any>,
  UF extends UpdateFilter,
> extends ReadOnlyStorageService<M, F> {
  abstract _buildCreateValue(data: CD): M['_creationAttributes'];

  abstract _buildUpdateValues(data: UD): Partial<M['_attributes']>;

  abstract _buildUpdateWhere(filter: UF): WhereOptions<M['_attributes']>;

  create(data: CD): Promise<M> {
    return this._Model.create(this._buildCreateValue(data));
  }

  async findAndUpdate(filter: UF, updateData: UD): Promise<M[]> {
    const values = this._buildUpdateValues(updateData);
    const where = this._buildUpdateWhere(filter);

    const [, models] = await this._Model.update(values, {
      where,
      returning: true,
    });

    return models;
  }

  async findByIdAndUpdate(id: string, updateData: UD, filter?: UF): Promise<M | null> {
    const result = await this.findAndUpdate(
      {
        id,
        ...filter,
      } as UF,
      updateData,
    );

    return result[0] || null;
  }

  async deleteByFilter(filter: UF): Promise<void> {
    const where = this._buildUpdateWhere(filter);

    await this._Model.destroy({
      where,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.deleteByFilter({
      id,
    } as UF);
  }
}
