# Authorization backend service

Microservices service for authorization related data.

Data that we store in the service:

1. User's email and hash of the password
2. Token for verify email
3. Token for reset password
4. Access and refresh tokens
5. User roles
6. Whether the user's email address is verified

Databases that we use inside service:

1. Postgres. We use [sequelize](https://sequelize.org/) to create all communications with database
2. Redis. We use [redis package](https://github.com/NodeRedis/node-redis) to interact with redis.
