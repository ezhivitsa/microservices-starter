import { AppMiddleware, AppContext, Next } from 'koa';

import { createLogger } from '@packages/logger';

interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export function prepareLoggerInitMiddleware(loggerConfig: LoggerConfig): AppMiddleware {
  const logger = createLogger(loggerConfig);

  return async (ctx: AppContext, next: Next): Promise<void> => {
    ctx.state.logger = logger.child({
      hostname: ctx.hostname,
    });

    await next();
  };
}
