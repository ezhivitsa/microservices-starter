import { KafkaConfig, ConsumerConfig } from '@packages/communication';

export interface LoggerConfig {
  format: 'local' | 'cloud';
  level?: 'info' | 'warn' | 'error';
}

export interface Config {
  readonly port: number;
  readonly useHttps: boolean;
  readonly domain: string;
  readonly logger: Readonly<LoggerConfig>;
  readonly kafka: KafkaConfig;
  readonly kafkaConsumer: ConsumerConfig;
  readonly tokens: {
    readonly accessTokenLifetime: number;
    readonly refreshTokenLifetime: number;
  };
  readonly returnSignupToken: boolean;
  readonly timeForVerifyEmail: number;
  readonly logErrors400: boolean;
}
