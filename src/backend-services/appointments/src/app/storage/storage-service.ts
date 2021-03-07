import { Document, DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';

import { ReadOnlyStorageService } from './read-only-storage-service';

interface Filter {
  id?: string;
}

interface UpdateFilter {
  id?: string;
}

export abstract class StorageService<
  D extends Document,
  F extends Filter,
  CD extends Record<string, any>,
  UD extends Record<string, any>,
  UF extends UpdateFilter
> extends ReadOnlyStorageService<D, F> {
  protected abstract _buildCreateValue(data: CD): D | DocumentDefinition<D>;

  protected abstract _buildUpdateValues(data: UD): UpdateQuery<D>;

  protected abstract _buildUpdateWhere(filter: UF): FilterQuery<D>;

  create(data: CD): Promise<D> {
    return this._Model.create(this._buildCreateValue(data));
  }

  async findAndUpdate(filter: UF, updateData: UD): Promise<D[]> {
    const values = this._buildUpdateValues(updateData);
    const where = this._buildUpdateWhere(filter);

    await this._Model.updateMany(where, values, { new: true }).exec();
    return this._Model.find(where);
  }

  async findByIdAndUpdate(id: string, updateData: UD, filter?: UF): Promise<D | null> {
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

    await this._Model.deleteMany(where).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.deleteByFilter({
      id,
    } as UF);
  }
}
