import { Kafka } from '../kafka';

export class BaseProvider {
  constructor(protected _kafka: Kafka) {}
}
