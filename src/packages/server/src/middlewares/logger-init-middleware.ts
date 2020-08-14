import { AppMiddleware, AppContext, Next } from 'koa';

import { createLogger } from '@packages/logger';

interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export function prepareLoggerInitMiddleware(loggerConfig: LoggerConfig): AppMiddleware {
  const logger = createLogger(loggerConfig);

  return (ctx: AppContext, next: Next): void => {
    ctx.state.logger = logger.child({
      hostname: ctx.hostname,
    });

    next();
  };
}
