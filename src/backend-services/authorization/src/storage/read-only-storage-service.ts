import { Model, ModelCtor, FindOptions } from 'sequelize';

interface Filter {
  id?: string;
}

export abstract class ReadOnlyStorageService<M extends Model, F extends Filter> {
  constructor(protected _Model: ModelCtor<M>) {}

  abstract _buildQuery(filter: F): FindOptions<M['_attributes']>;

  findByFilter(filter: F): Promise<M[]> {
    return this._Model.findAll(this._buildQuery(filter));
  }

  findOneByFilter(filter: F): Promise<M | null> {
    return this._Model.findOne(this._buildQuery(filter));
  }

  findById(id: string, filter?: F): Promise<M | null> {
    return this.findOneByFilter({
      id,
      ...filter,
    } as F);
  }
}
