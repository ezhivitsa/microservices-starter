import { KafkaConfig } from 'kafkajs';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly logger: Readonly<LoggerConfig>;
  readonly requestIdHeader: string;
  readonly kafka: KafkaConfig;
}
