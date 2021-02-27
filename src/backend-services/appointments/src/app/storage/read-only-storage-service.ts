import { Model, Document, FilterQuery } from 'mongoose';

interface Filter {
  id?: string;
}

export abstract class ReadOnlyStorageService<D extends Document, F extends Filter> {
  protected abstract _Model: Model<D>;

  protected abstract _buildQuery(filter: F): FilterQuery<D>;

  findByFilter(filter: F): Promise<D[]> {
    return this._Model.find(this._buildQuery(filter)).exec();
  }

  findOneByFilter(filter: F): Promise<D | null> {
    return this._Model.findOne(this._buildQuery(filter)).exec();
  }

  findById(id: string, filter?: F): Promise<D | null> {
    return this.findOneByFilter({
      id,
      ...filter,
    } as F);
  }
}
