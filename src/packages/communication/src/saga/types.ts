export type SagaAction<M> = (meta: M) => Promise<void>;

export interface SagaStep<M> {
  action?: SagaAction<M>;
  compensationAction?: SagaAction<M>;
}
