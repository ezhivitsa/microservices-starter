# REDIS API Reference

### getRedis(config)

Create connection to redis

#### Arguments
- `config` - *(Object)* connection options
  - `port` - *(number)* redis port
  - `host` - *(string)* redis hostname
  - `password` - *(string)* optional user password that will be used to connect

#### Return

Return custom `Redis` instance with methods to create `Cache` instance and close connection.
