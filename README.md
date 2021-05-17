## DOCUMENTATION OF THE `GRID COMPONENT`

### PARAMETERS AND USAGE:

`data` - array of objects data

`columns` - array of objects defining columns

Example usage: 

```
<grid :data="dummy.data" :columns="dummy.columns" />
```

## NORMALIZED DATA:

Example:

```
  data: [{
    id: 1,
    no: 1,
    keyword: 'test 1',
    clicks: 1,
    fcp: 2,
    si: 2,
    lcp: 3,
    tti: 10,
    tbt: 20,
    cls: 5
  },
  {
    id: 1,
    no: 1,
    keyword: 'test 2',
    clicks: 1,
    fcp: 2,
    si: 3,
    lcp: 4,
    tti: 5,
    tbt: 6,
    cls: 7
  },
  {
    omit: true,
    summary: {
      clicks: 2,
      fcp: 4,
      si: 5,
      lcp: 7,
      tti: 15,
      tbt: 26,
      cls: 12
    }
  }
```

- **omit** - flag that can tell us which row is a summary (displayed in `Total` row)
- **summary** - calculated sum of all values in column

### DEFINING COLUMNS:

Example:

```
 columns: [{
    text: 'Id',
    dataIndex: 'id',
    sortable: false,
    locked: true
  }, {
    text: 'No',
    dataIndex: 'no',
    locked: true
  }, {
    text: 'Page',
    locked: true,
    dataIndex: 'page',
    showTotal: true,
    width: 250
}]
```

- **text** `String` - text to display on header of column
- **dataIndex** `String` - data source field

for example:

if source data: 
```
[{
  a: 'aaa',
  b: 'bbb',
  c: 'ccc'
}, {
  a: 'aaaa',
  b: 'bbbb',
  c: 'cccc'
},
...
]
```
then columns definition: 
```
[{
  text: 'Display data a',
  dataIndex: 'a'
}, {
  text: 'Display data b',
  dataIndex: 'b'
}, {
  text: 'Display data c',
  dataIndex: 'c'
}]
```

- **locked** `Boolean` - is column locked

- **lastLocked** `Boolean` - is last locked column - TODO - calcuate this automatically in the future

- **disallowSort** `Boolean` - is sort disallowed

- **showTotal** `Boolean` - is `Total` text should be show in this column 

- **customStyles** `Object` - custom styles for column, they are binded to :style
  - **customStyles.header** - custom styles for header cell
  - **customStyles.data** - custom styles for data cell
Example:
```
customStyles: {
  header: {
    background: '#E1EDF9'
  },
  data: {
    color: '#E1EDF9'
  }
}
```
- **listeners** `Object` - custom behavior for the following events:
  - click
  - dblclick
  - mouseenter
  - mouseleave

The list of events can be easily expanded in the future.

Example:

```
listeners: {
  click: (self, rowData) {
    ...
  }
}

```
where:
 - `self` - column definition
 - `rowData` - row data
