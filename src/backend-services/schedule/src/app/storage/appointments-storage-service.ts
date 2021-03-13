import _ from 'lodash';
import { WhereOptions, FindOptions, Op } from 'sequelize';

import {
  AppointmentInstance,
  AppointmentModel,
  AppointmentAttributes,
  AppointmentCreationAttributes,
} from '@root/lib/db/models/appointment';
import { db } from '@root/lib/db/models';

import { StorageService } from './storage-service';

interface Filter {
  id?: string;
  withUser?: boolean;
  from?: Date;
  to?: Date;
}

interface UpdateFilter {
  id?: string;
}

interface CreateData {
  id: string;
  userId: string;
  start: Date;
  end: Date;
  description: string | null;
}

interface UpdateData {
  start?: Date;
  end?: Date;
  description?: string | null;
}

export class AppointmentsStorageService extends StorageService<
  AppointmentInstance,
  Filter,
  CreateData,
  UpdateData,
  UpdateFilter
> {
  _Model: AppointmentModel = db.Appointment;

  _buildCreateValue(data: CreateData): AppointmentCreationAttributes {
    return {
      id: data.id,
      userId: data.userId,
      start: data.start,
      end: data.end,
      description: data.description,
    };
  }

  _buildUpdateValues(data: UpdateData): Partial<AppointmentAttributes> {
    return {
      start: data.start,
      end: data.end,
      description: data.description,
    };
  }

  _buildUpdateWhere(filter: UpdateFilter): WhereOptions<AppointmentAttributes> {
    return {
      id: filter.id,
    };
  }

  _buildQuery(filter: Filter): FindOptions<AppointmentAttributes> {
    const where: WhereOptions<AppointmentAttributes> = {
      id: filter.id,
    };

    if (filter.from || filter.to) {
      where.start = _.pickBy(
        {
          [Op.gte]: filter.from,
          [Op.lte]: filter.to,
        },
        (value) => value !== undefined,
      );
    }

    const include = [];
    if (filter.withUser) {
      include.push(db.User);
    }

    return {
      where: _.pickBy(where, (value) => value !== undefined),
      include,
    };
  }
}

export const appointmentsStorageService = new AppointmentsStorageService();
