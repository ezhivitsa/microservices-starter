import { KafkaConfig } from '@packages/communication';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly port: number;
  readonly useHttps: boolean;
  readonly logger: Readonly<LoggerConfig>;
  readonly requestIdHeader: string;
  readonly kafka: KafkaConfig;
}
