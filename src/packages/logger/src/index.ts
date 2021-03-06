import { createLogger as winstonCreateLogger, transports, Logger, LoggerOptions } from 'winston';

import { localFormat, cloudFormat } from './formats';
import * as utils from './utils';
import { LoggerConfig } from './types';

export function createLogger(loggerConfig: LoggerConfig): Logger {
  let format: LoggerOptions['format'];
  switch (loggerConfig.format) {
    case 'local':
      format = localFormat;
      break;
    case 'cloud':
      format = cloudFormat;
      break;
    default:
      throw new Error(`Unsupported logger format: ${loggerConfig.format}`);
  }

  return winstonCreateLogger({
    level: loggerConfig.level,
    format,
    transports: [
      new transports.Console({
        stderrLevels: ['error'],
        consoleWarnLevels: ['warn'],
      }),
    ],
  });
}

export { utils };
