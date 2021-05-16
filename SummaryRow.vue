<template>
  <tr :class="getTableRowClass(columns)">
    <td
      v-for="(column, idx) in columns"
      :key="`summary-row-${idx}`"
      :class="getTableDataClass(column)"
    >
      {{ getColumnData(column, data) }}
    </td>
  </tr>
</template>

<script>
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
.sticky-column-1 {
  tr th:first-child,
  td:first-child {
    position: sticky;
    max-width: 100px;
    min-width: 100px;
    height: 75px;
    left: 0;
    z-index: 10;
    background: white;
  }
}
.sticky-column-2 {
  tr th:nth-child(2),
  td:nth-child(2) {
    position: sticky;
    max-width: 80px;
    min-width: 80px;
    height: 75px;
    left: 100px;
    z-index: 10;
    background: white;
  }
}
.sticky-column-3 {
  tr th:nth-child(3),
  td:nth-child(3) {
    position: sticky;
    max-width: 80px;
    min-width: 80px;
    height: 75px;
    left: 160px;
    z-index: 10;
    background: white;
  }
}
</style>
