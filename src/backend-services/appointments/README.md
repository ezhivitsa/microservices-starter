# Appointments backend service

Microservices service for managing appointments.
In this service we store events and snapshots ([event sourcing approach](https://microservices.io/patterns/data/event-sourcing.html))

Actions that can be done with appointments:

1. Create appointment
2. Update appointment
3. Delete appointment

When we save new event to database we also send event to kafka that can be handled by other backend services.

Databases that we use inside service:

1. MongoDB. We use [mongoose](https://mongoosejs.com/) to communicate with database
