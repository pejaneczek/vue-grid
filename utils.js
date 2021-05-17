import { DEFAULT_LOCKED_COLUMN_STYLES, TABLE_PARTIALS } from './constants'

export const getLockedColumnStyles = (currentColumn, allColumns, tablePart) => {
  let left = 0
  let width = DEFAULT_LOCKED_COLUMN_STYLES['max-width']
  let finded = false

  allColumns.forEach((col, idx) => {
    if (col.dataIndex !== currentColumn.dataIndex && !finded) {
      left += col?.customStyles?.data?.width || width
    }

    if (!finded) {
      switch (tablePart) {
        case TABLE_PARTIALS.HEADER:
          width = currentColumn?.customStyles?.header?.width || width
          break
        case TABLE_PARTIALS.DATA:
          width = currentColumn?.customStyles?.data?.width || width
          break
      }
    }

    if (col.dataIndex === currentColumn.dataIndex) {
      finded = true
    }
  })

  return {
    left: `${left}px`,
    'max-width': `${width}px`,
    'min-width': `${width}px`
  }
}
