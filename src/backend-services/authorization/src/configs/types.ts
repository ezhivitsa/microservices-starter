import { KafkaConfig, ConsumerConfig } from 'kafkajs';
import { ClientOpts } from 'redis';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly logger: Readonly<LoggerConfig>;
  readonly requestIdHeader: string;
  readonly kafka: KafkaConfig;
  readonly kafkaConsumer: ConsumerConfig;
  readonly redis: ClientOpts;
}
