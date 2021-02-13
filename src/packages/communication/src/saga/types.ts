import { CommandMetadata } from '../kafka/types';

export type SagaAction = (meta: CommandMetadata) => Promise<void>;

export interface SagaStep {
  action?: SagaAction;
  compensationAction?: SagaAction;
}
