import { ConstructorParams } from 'mailgun-js';
import { KafkaConfig, ConsumerConfig } from '@packages/communication';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly logger: Readonly<LoggerConfig>;
  readonly requestIdHeader: string;
  readonly kafka: KafkaConfig;
  readonly kafkaConsumer: ConsumerConfig;
  readonly mailgun: ConstructorParams;
}
