import { SagaStep, SagaAction } from './types';

export class SagaStepData<M> {
  readonly action?: SagaAction<M>;
  readonly compensationAction?: SagaAction<M>;
  readonly isRetriable: boolean;

  constructor({
    action,
    compensationAction,
    isRetriable,
  }: {
    action?: SagaAction<M>;
    compensationAction?: SagaAction<M>;
    isRetriable: boolean;
  }) {
    this.action = action;
    this.compensationAction = compensationAction;
    this.isRetriable = isRetriable;
  }
}

export class SagaBuilder<M> {
  private _steps: SagaStep<M>[] = [];

  constructor() {
    this._steps.push({});
  }

  get _lastStep(): SagaStep<M> {
    return this._steps[this._steps.length - 1];
  }

  get _retriableTransactions(): SagaStep<M>[] {
    let pivotIndex = 0;

    for (let i = this._steps.length - 1; i >= 0; i -= 1) {
      const step = this._steps[i];
      if (step.compensationAction) {
        pivotIndex = i + 1;
        break;
      }
    }

    return this._steps.slice(pivotIndex);
  }

  invokeParticipant(action: SagaAction<M>): SagaBuilder<M> {
    this._lastStep.action = action;
    return this;
  }

  withCompensation(action: SagaAction<M>): SagaBuilder<M> {
    this._lastStep.compensationAction = action;
    return this;
  }

  step(): void {
    this._steps.push({});
  }

  build(): SagaStepData<M>[] {
    const retriableTransactions = this._retriableTransactions;

    return this._steps.map((step) => {
      return new SagaStepData({
        action: step.action,
        compensationAction: step.compensationAction,
        isRetriable: retriableTransactions.includes(step),
      });
    });
  }
}
