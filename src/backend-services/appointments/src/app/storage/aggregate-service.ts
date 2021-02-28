import { AggregateBuilder } from './aggregate-builder';
import { ReadOnlyAggregateService } from './read-only-aggregate-service';

export abstract class AggregateService<D, AB extends { new (): AggregateBuilder<D> }> extends ReadOnlyAggregateService<
  D,
  AB
> {}
