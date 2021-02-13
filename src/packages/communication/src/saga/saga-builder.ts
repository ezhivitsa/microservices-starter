import { SagaStep, SagaAction } from './types';

export class SagaStepData {
  readonly action?: SagaAction;
  readonly compensationAction?: SagaAction;
  readonly isRetriable: boolean;

  constructor({
    action,
    compensationAction,
    isRetriable,
  }: {
    action?: SagaAction;
    compensationAction?: SagaAction;
    isRetriable: boolean;
  }) {
    this.action = action;
    this.compensationAction = compensationAction;
    this.isRetriable = isRetriable;
  }
}

export class SagaBuilder {
  private _steps: SagaStep[] = [];

  constructor() {
    this._steps.push({});
  }

  get _lastStep(): SagaStep {
    return this._steps[this._steps.length - 1];
  }

  get _retriableTransactions(): SagaStep[] {
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

  invokeParticipant(action: SagaAction): SagaBuilder {
    this._lastStep.action = action;
    return this;
  }

  withCompensation(action: SagaAction): SagaBuilder {
    this._lastStep.compensationAction = action;
    return this;
  }

  step(): void {
    this._steps.push({});
  }

  build(): SagaStepData[] {
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
