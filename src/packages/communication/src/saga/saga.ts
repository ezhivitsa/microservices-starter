import { SagaBuilder, SagaStepData } from './saga-builder';
import { SagaAction } from './types';

export abstract class Saga<M> {
  private _buildEnded = false;
  private _builder?: SagaBuilder<M>;

  protected _sagaDefinition: SagaStepData<M>[] = [];

  step(): Saga<M> {
    if (!this._builder) {
      this._builder = new SagaBuilder();
    } else if (!this._buildEnded) {
      this._builder.step();
    }

    return this;
  }

  invokeParticipant(action: SagaAction<M>): Saga<M> {
    if (!this._buildEnded) {
      this._builder?.invokeParticipant(action);
    }

    return this;
  }

  withCompensation(action: SagaAction<M>): Saga<M> {
    if (!this._buildEnded) {
      this._builder?.withCompensation(action);
    }

    return this;
  }

  build(): SagaStepData<M>[] {
    this._buildEnded = true;
    return this._builder?.build() || [];
  }

  async start(meta: M): Promise<void> {
    const compensateStack: SagaAction<M>[] = [];

    try {
      for (let i = 0; i < this._sagaDefinition.length; i += 1) {
        const step = this._sagaDefinition[i];

        const action = step.action;
        if (action) {
          await action(meta);
        }

        if (step.isRetriable) {
          compensateStack.splice(0, compensateStack.length);
        } else if (step.compensationAction) {
          compensateStack.push(step.compensationAction);
        }
      }
    } catch (err) {
      for (let i = compensateStack.length - 1; i >= 0; i -= 1) {
        await compensateStack[i](meta);
      }

      throw err;
    }
  }
}
