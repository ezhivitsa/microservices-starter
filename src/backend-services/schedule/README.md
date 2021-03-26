# Schedule backend service

Microservices service for schedule data.

This service handle events from other backend services and aggregate data together ([CQRS approach](https://microservices.io/patterns/data/cqrs.html)).

Here we handle the following events:

1. UserCreated
2. UserUpdated
3. AppointmentCreated
4. AppointmentUpdated
5. AppointmentDeleted

Storing data from this events allowed us to created command to return appointments data with related user data for certain time period.

Databases that we use inside service:

1. Postgres. We use [sequelize](https://sequelize.org/) to create all communications with database
