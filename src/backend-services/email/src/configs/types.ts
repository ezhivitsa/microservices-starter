import { ConstructorParams } from 'mailgun-js';
import { KafkaConfig, ConsumerConfig } from '@packages/communication';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface EmailConfig {
  isSendEmail: boolean;
  savedEmailHtmlPath?: string;
}

export interface Config {
  readonly port: number;
  readonly logger: Readonly<LoggerConfig>;
  readonly requestIdHeader: string;
  readonly kafka: KafkaConfig;
  readonly kafkaConsumer: ConsumerConfig;
  readonly mailgun: ConstructorParams;
  readonly email: EmailConfig;
  readonly webUrl: string;
}
