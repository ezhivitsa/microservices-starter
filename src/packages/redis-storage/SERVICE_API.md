# Services documentation

- [Storage service](#storage-service)
  - [_stringToData(value)](#_stringtodatavalue)
  - [find(key)](#findkey)
  - [create(key, data, expiresAt)](#createkey-data-expiresat)
  - [delete(key)](#deletekey)

## Storage service

Abstract class which provides ability to read data from mongo collection. Requires providing `Cache` and implementing method `_stringToData`.

### _stringToData(value)

Method for transforming stored string to desired format.

#### Arguments

- `value` - *(string)* - stored string in redis

#### Return

Returns data in any required format or null.

### find(key)

Find and return stored data by key

#### Arguments

- `key` - *(string)* - key to find

#### Return

Returns promise with transformed data or null;

### create(key, data, expiresAt)

Save data to redis

#### Arguments

- `key` - *(string)* - redis key
- `data` - *(Object)* - data that will be stringified and saved
- `expiresAt` - *(Date)* - date when key will be deleted

#### Return

Returns promise.

### delete(key)

Delete key to redis

#### Arguments

- `key` - *(string)* - redis key

#### Return

Returns promise.

