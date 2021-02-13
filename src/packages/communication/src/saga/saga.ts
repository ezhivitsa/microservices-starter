import { CommandMetadata } from '../kafka/types';

import { SagaBuilder, SagaStepData } from './saga-builder';
import { SagaAction } from './types';

export abstract class Saga {
  private _buildEnded = false;
  private _builder?: SagaBuilder;

  protected _sagaDefinition: SagaStepData[] = [];

  step(): Saga {
    if (!this._builder) {
      this._builder = new SagaBuilder();
    } else if (!this._buildEnded) {
      this._builder.step();
    }

    return this;
  }

  invokeParticipant(action: SagaAction): Saga {
    if (!this._buildEnded) {
      this._builder?.invokeParticipant(action);
    }

    return this;
  }

  withCompensation(action: SagaAction): Saga {
    if (!this._buildEnded) {
      this._builder?.withCompensation(action);
    }

    return this;
  }

  build(): SagaStepData[] {
    this._buildEnded = true;
    return this._builder?.build() || [];
  }

  async start(meta: CommandMetadata): Promise<void> {
    const compensateStack: SagaAction[] = [];

    try {
      for (let i = 0; i < this._sagaDefinition.length; i += 1) {
        const step = this._sagaDefinition[i];

        const action = step.action;
        if (action) {
          await action(meta);
        }

        if (step.compensationAction && !step.isRetriable) {
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
