import { AppContext, Next, RequestStatus } from '@packages/koa-kafka';

import { utils } from '@packages/logger';

const LOG_DATA_LIMIT = 1024 * 6; // 8Kb

export async function logRequestMiddleware(ctx: AppContext, next: Next): Promise<void> {
  const { command, event, version, requestId, user } = ctx;

  ctx.onFinish((status: RequestStatus) => {
    const { startTime, logger } = ctx.state;

    const logData = {
      req: {
        body: ctx.data && utils.cutLongDataForLog(JSON.stringify(ctx.data), LOG_DATA_LIMIT),
        command,
        event,
        version,
        startTime: startTime && new Date(startTime),
        requestId,
        user,
      },
      res: {
        time: startTime && Date.now() - startTime,
        body: ctx.body && utils.cutLongDataForLog(JSON.stringify(ctx.body), LOG_DATA_LIMIT),
        status,
      },
    };
    const logMessage = 'Incoming request';

    if (status === RequestStatus.Ok) {
      logger.info(logMessage, logData);
    } else if (status === RequestStatus.BadRequest) {
      logger.warn(logMessage, logData);
    } else {
      logger.error(logMessage, logData);
    }
  });

  await next();
}
