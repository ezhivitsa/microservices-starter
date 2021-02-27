import { Model } from 'mongoose';

import { EventModel } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

export abstract class ReadOnlyAggregateService<D> {
  protected abstract _EventModel: EventModel;
  protected abstract _SnapshotModel: Model<SnapshotDocument<D>>;

  async findById(id: string): Promise<D | null> {
    const snapshot = await this._SnapshotModel.findById(id).exec();

    const version = snapshot?.version || 0;
    const events = await this._EventModel.find({ version: { $gte: version } }).exec();
  }
}
