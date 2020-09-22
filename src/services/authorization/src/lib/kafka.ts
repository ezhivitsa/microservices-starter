import { Kafka, logLevel, LogEntry } from 'kafkajs';

import { config } from './config';
import { logger } from './logger';

type WinstonLogLevel = 'error' | 'warn' | 'info' | 'debug';

const toWinstonLogLevel = (level: logLevel): WinstonLogLevel => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
  }
};

const winstonLogCreator = () => {
  return ({ level, log }: LogEntry) => {
    const { message, ...extra } = log;

    logger.log({
      level: toWinstonLogLevel(level),
      message,
      extra,
    });
  };
};

const kafka = new Kafka({
  ...config.kafka,
  logCreator: winstonLogCreator,
});
