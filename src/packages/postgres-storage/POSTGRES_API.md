# POSTGRES API Reference

### getSequelize(config, evn)

Create connection to postgreSQL

#### Arguments
- `config` - *(Object)* connection options
  - `port` - *(number)* postgreSQL port
  - `host` - *(string)* postgreSQL hostname
  - `database` - *(string)* name of the database to connect
  - `username` - *(string)* optional username that will be used to connect
  - `password` - *(string)* optional user password that will be used to connect
- `env` - *(EnvType)* environment type

#### Return

Returns `Sequelize` object from `sequelize`.

### getConfigs(config)

Get postgres configs for different environments.

#### Arguments
- `config` - *(Object)* connection options
  - `port` - *(number)* postgreSQL port
  - `host` - *(string)* postgreSQL hostname
  - `database` - *(string)* name of the database to connect
  - `username` - *(string)* optional username that will be used to connect
  - `password` - *(string)* optional user password that will be used to connect

#### Return

Returns `Record<Enviroment, Sequelize>`.
