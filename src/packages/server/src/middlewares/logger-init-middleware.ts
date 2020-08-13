import { createLogger } from '@packages/logger';

interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export function prepareLoggerInitMiddleware(loggerConfig: LoggerConfig) {
  const logger = createLogger(loggerConfig);

}
