import { Model } from 'mongoose';

import { EventModel } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';

import { AggregateBuilder } from './aggregate-builder';

export abstract class ReadOnlyAggregateService<D, AB extends { new (): AggregateBuilder<D> }> {
  protected abstract _EventModel: EventModel;
  protected abstract _SnapshotModel: Model<SnapshotDocument<D>>;
  protected abstract _Builder: AB;

  async findById(id: string): Promise<D | null> {
    const snapshot = await this._SnapshotModel.findById(id).exec();

    const version = snapshot?.version || 0;
    const events = await this._EventModel.find({ version: { $gte: version } }).exec();

    const builder = new this._Builder();
    return builder.build(snapshot, events);
  }
}
