# Event sourcing package

Package for organizing work with events, aggregates and snapshots.

## Models

Package contains `mongoose` models and schemas which are useful in event-sourcing architecture. Particularly we provide the following models:

1. Counter model. This model is used to store last version of the aggregate event.
2. Event model. This model is used to store event and related data.
3. Snapshot model. This model is used to store snapshot of the aggregate which we update when collect certain number of events.

## Aggregate service

We provide base service for implementing work with aggregate. You have to implement `AggregateBuilder` to construct resulting data from events and implement `AggregateService` to get aggregate and save events.
