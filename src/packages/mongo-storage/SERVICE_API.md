# Services documentation

- [Read only storage service](#read-only-storage-service)
  - [_buildQuery(filter)](#_buildqueryfilter)
  - [findByFilter(filter)](#findbyfilterfilter)
  - [findOneByFilter(filter)](#findonebyfilterfilter))
  - [findById(id, [filter])](#findbyidid-filter)
- [Storage service](#storage-service)
  - [_buildCreateValue(data)](#_buildcreatevaluedata)
  - [_buildUpdateValues(data)](#_buildupdatevaluesdata)
  - [_buildUpdateWhere(filter)](#_buildupdatewherefilter)

## Read only storage service

Abstract class which provides ability to read data from mongo collection. Requires providing `Model` and implementing method `_buildQuery`.

### _buildQuery(filter)

Method for transforming custom filters to mongo `FilterQuery` object.

#### Arguments

- `filter` - *(Object)* - object with custom properties according to which we filter data in a proper way

#### Return

Returns `FilterQuery` from `mongoose`.

### findByFilter(filter)

Get list of objects which match specified filter.

#### Arguments

- `filter` - *(Object)* - object with custom properties according to which we filter data in a proper way

#### Return

Returns promise with list of matching objects.

### findOneByFilter(filter)

Get first object matching to filter or get null.

#### Arguments

- `filter` - *(Object)* - object with custom properties according to which we filter data in a proper way

#### Return

Returns promise with matching object or null.

### findById(id, [filter])

Get object or null by id.

#### Arguments

- `id` - *(string)* - id of the object that we want to get
- `filter` - *(Object)* - optional object with custom properties according to which we additionally filter data in a proper way

#### Return

Returns promise with matching object or null.

## Storage service

Abstract class which extends `ReadOnlyStorageService` class and adds methods for modifying collection. Also it additionally requires to implement three methods `_buildCreateValue`, `_buildUpdateValues` and `_buildUpdateWhere`.

### _buildCreateValue(data)

Method for generating object to save to the mongoDB.

#### Arguments

- `data` - *(Object)* - object which is used for generating value to save

#### Return

Returns `Document` or `DocumentDefinition` for `mongoose`.

### _buildUpdateValues(data)

### _buildUpdateWhere(filter)
