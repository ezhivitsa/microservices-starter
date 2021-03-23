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
  - [create(data)](#createdata)
  - [findAndUpdate(filter, updateData)](#findandupdatefilter-updatedata)
  - [findByIdAndUpdate(id, updateData, [filter])](#findbyidandupdateid-updatedata-filter)
  - [deleteByFilter(filter)](#deletebyfilterfilter)
  - [deleteById(id)](#deletebyidid)

## Read only storage service

Abstract class which provides ability to read data from mongo collection. Requires providing `Model` and implementing method `_buildQuery`.

### _buildQuery(filter)

Method for transforming custom filters to postges `FindOptions` object.

#### Arguments

- `filter` - *(Object)* - object with custom properties according to which we filter data in a proper way

#### Return

Returns `FindOptions` from `sequelize`.

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

Method for generating object to save to the postgres.

#### Arguments

- `data` - *(Object)* - object which is used for generating value to save

#### Return

Returns `_creationAttributes` from the specified postgres model.

### _buildUpdateValues(data)

Method to get result values to update document.

#### Arguments

- `data` - *(Object)* - object which is used for generating value to update

#### Return

Returns `_attributes` from the specified postgres model.

### _buildUpdateWhere(filter)

Method to get filtering expressing according to which we update documents.

#### Arguments

- `filter` - *(Object)* - custom object with filtering parameters

#### Return

Returns `WhereOptions` from `sequelize`.

### create(data)

Save document to table.

#### Arguments

- `data` - *(Object)* - object with data to save

#### Return

Returns promise with model instance.

### findAndUpdate(filter, updateData)

Update document which match to the filter.

#### Arguments

- `filter` - *(Object)* - object with parameters for filtering
- `updateData` - *(Object)* - data that will be updated

#### Return

Returns promise with updated model instances.

### findByIdAndUpdate(id, updateData, [filter])

Update document which match to id and optional filters.

#### Arguments

- `id` - *(string)* id of the document
- `updateData` - *(Object)* - data that will be updated
- `filter` - *(Object)* - optional object with additional parameters for filtering

#### Return

Returns promise with updated model instance or null.

### deleteByFilter(filter)

Delete documents according to filter.

#### Arguments

- `filter` - *(Object)* - object with parameters for filtering

#### Return

Returns promise.

### deleteById(id)

Delete document that match to id.

#### Arguments

- `id` - *(string)* id of the document

#### Return

Returns promise.
