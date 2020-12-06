import { Model, ModelCtor, FindOptions } from 'sequelize';

export abstract class ReadOnlyStorageService<M extends Model, F extends Record<string, any>> {
  constructor(protected _Model: ModelCtor<M>) {}

  abstract _buildQuery(filter: F): FindOptions<M['_attributes']>;

  async findByFilter(filter: F): Promise<M[]> {
    return this._Model.findAll(this._buildQuery(filter));
  }

  async findOneByFilter(filter: F): Promise<M | null> {
    return this._Model.findOne(this._buildQuery(filter));
  }
}
