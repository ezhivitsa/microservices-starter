import { AppContext, Next } from 'koa';

import { utils } from '@packages/logger';

const LOG_DATA_LIMIT = 1024 * 6; // 8Kb

export function logRequestMiddleware(ctx: AppContext, next: Next): void {
  const { response, request, res, req } = ctx;

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const { startTime, logger } = ctx.state;

    const logData = {
      req: {
        contentLength: request.length,
        body: ctx.body && utils.cutLongDataForLog(JSON.stringify(ctx.body), LOG_DATA_LIMIT),
        url: ctx.originalUrl,
        method: req.method,
        startTime: startTime && new Date(startTime),
      },
      res: {
        contentLength: response.length,
        time: startTime && Date.now() - startTime,
        statusCode,
        selectedHeaders: {
          location: response.headers.location,
        },
      },
    };
    const logMessage = 'Incoming request';

    if (statusCode < 400) {
      logger.info(logMessage, logData);
    } else if (statusCode < 500) {
      logger.warn(logMessage, logData);
    } else {
      logger.error(logMessage, logData);
    }
  });

  next();
}
