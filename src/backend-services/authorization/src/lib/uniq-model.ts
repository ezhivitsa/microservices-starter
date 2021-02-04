import { UniqModel } from '@packages/koa-kafka';
import { AuthorizationTypes } from '@packages/communication';

import { CommandsService } from 'services';

export const uniqModel: UniqModel = {
  conflictCode: AuthorizationTypes.ErrorCode.Conflict,
  isUniqId: CommandsService.isUniq,
  saveId: CommandsService.addId,
};
