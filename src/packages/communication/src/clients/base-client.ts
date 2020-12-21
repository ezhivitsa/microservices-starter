import { Kafka } from '../kafka';

export class BaseClient {
  constructor(protected _kafka: Kafka) {}
}
