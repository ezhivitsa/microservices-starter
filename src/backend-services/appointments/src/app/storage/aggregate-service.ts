import { Model, UpdateQuery } from 'mongoose';

import { Event } from '@packages/communication';

import { EventMetadata, EventModel } from '@root/lib/db/models/appointment-event';
import { SnapshotDocument } from '@root/lib/db/models/appointment-snapshot';
import { generateId } from '@root/lib/db/utils';
import { db } from '@root/lib/db/models';

import { AggregateBuilder } from './aggregate-builder';

interface EventData {
  type: Event;
  aggregateId: string;
  metadata: EventMetadata;
  data?: Record<string, any>;
}

const SNAPSHOT_VERSION_GAP = 5;
const SNAPSHOT_VERSION_THRESHOLD = 10;

export abstract class AggregateService<D extends Record<string, any>> {
  protected abstract _EventModel: EventModel;
  protected abstract _SnapshotModel: Model<SnapshotDocument<D>>;
  protected abstract _Builder: { new (): AggregateBuilder<D> };

  private async _getNextSequenceValue(aggregateId: string): Promise<number> {
    const sequenceDocument = await db.Counter.findByIdAndUpdate(
      aggregateId,
      { $inc: { sequenceValue: 1 } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).exec();
    return sequenceDocument.sequenceValue;
  }

  private async _saveAggregateSnapshot({
    aggregateId,
    data,
    version,
  }: {
    aggregateId: string;
    data: D;
    version: number;
  }): Promise<void> {
    await this._SnapshotModel
      .findByIdAndUpdate(
        aggregateId,
        ({
          $set: {
            version,
            data,
          },
        } as unknown) as UpdateQuery<SnapshotDocument<D>>,
        { upsert: true },
      )
      .exec();
  }

  private async _saveSnapshot(aggregateId: string): Promise<void> {
    const { data, lastEventVersion } = await this._getAggregateData(aggregateId);

    if (data) {
      this._saveAggregateSnapshot({
        aggregateId,
        data,
        version: lastEventVersion,
      });
    }
  }

  private async _getAggregateData(id: string): Promise<{ data: D | null; version: number; lastEventVersion: number }> {
    const snapshot = await this._SnapshotModel.findById(id).exec();

    const version = snapshot?.version || 0;
    const events = await this._EventModel.find({ version: { $gte: version } }).exec();

    const lastEvent = events[events.length - 1];
    const lastEventVersion = lastEvent?.version || 0;

    const builder = new this._Builder();
    return {
      data: builder.build(snapshot, events),
      version,
      lastEventVersion,
    };
  }

  async findById(id: string): Promise<D | null> {
    const { version, data, lastEventVersion } = await this._getAggregateData(id);

    if (data && lastEventVersion - version > SNAPSHOT_VERSION_THRESHOLD) {
      this._saveAggregateSnapshot({ aggregateId: id, data, version: lastEventVersion });
    }

    return data;
  }

  async saveEvent(eventData: EventData): Promise<void> {
    const version = await this._getNextSequenceValue(eventData.aggregateId);

    await this._EventModel.create({
      id: generateId(),
      createdAt: new Date(),
      type: eventData.type,
      aggregateId: eventData.aggregateId,
      version,
      metadata: eventData.metadata,
      data: eventData.data,
    });

    if (version % SNAPSHOT_VERSION_GAP === 0) {
      this._saveSnapshot(eventData.aggregateId);
    }
  }
}
