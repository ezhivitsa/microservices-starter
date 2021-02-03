import { AppMiddleware, AppContext, Next } from '@packages/koa-kafka';

import { createLogger } from '@packages/logger';

interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export function prepareLoggerInitMiddleware(loggerConfig: LoggerConfig): AppMiddleware {
  const logger = createLogger(loggerConfig);

  return async (ctx: AppContext, next: Next): Promise<void> => {
    ctx.state.logger = logger.child({});

    await next();
  };
}
