<template>
  <tr :class="getTableRowClass(columns)">
    <td
      v-for="(column, idx) in columns"
      :key="`summary-row-${idx}`"
      :class="getTableDataClass(column)"
      :style="getTableDataStyles(column, columns, TABLE_PARTIALS.DATA)"
    >
      {{ getColumnData(column, data) }}
    </td>
  </tr>
</template>

<script>
import { DEFAULT_LOCKED_COLUMN_STYLES, TABLE_PARTIALS } from './constants'
import { getLockedColumnStyles } from './utils'

export default {
  name: 'SummaryRow',
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    summaryKey: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      DEFAULT_LOCKED_COLUMN_STYLES,
      TABLE_PARTIALS
    }
  },
  methods: {
    getTableRowClass (columns) {
      return columns.map((column, idx) => column.locked
        ? `sticky-column-${++idx}`
        : '')
    },
    getTableDataClass (column) {
      const tableDataClasses = []

      if (column.lastLocked) {
        tableDataClasses.push('last-locked')
      }

      return tableDataClasses
    },
    getTableDataStyles (column, columns, tablePart) {
      const tableDataStyles = []

      if (column.customStyles) {
        tableDataStyles.push(column.customStyles.data)
      }

      if (column.locked) {
        const calculatedLockedStyles = getLockedColumnStyles(column, columns, tablePart)

        tableDataStyles.push({
          ...DEFAULT_LOCKED_COLUMN_STYLES,
          ...calculatedLockedStyles
        })
      }
      return tableDataStyles
    },
    getColumnData (column, data) {
      if (column.showTotal) {
        return this.$t('total')
      }

      if (column.locked) {
        return ''
      }

      const summaryData = data.filter(obj => obj.omit)
      return summaryData.length ? summaryData[0].summary[column.dataIndex] : ''
    }
  }
}
</script>

<style lang="scss" scoped>
tr, td {
  font-size: 14px;
  font-weight: 700;
}
.last-locked {
  box-shadow: rgba(136, 165, 191, 0.48) 6px 16px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
</style>
