<template>
  <div>
    <div class="table-container">
      <table :class="getTableClass(columns)">
        <tr>
          <th
            v-for="column in columns"
            :key="column.text"
            :class="getTableHeaderClass(column)"
            :style="getTableHeaderStyles(column, columns, TABLE_PARTIALS.HEADER)"
          >
            <div
              :class="getHeaderClass(column)"
              @click="handleSort(column.dataIndex)"
            >
              <div v-if="!column.disallowSort">
                <icon-sort-tool />
              </div>
              <div class="column-text" :class="getColumnTextClass(column)">
                <div>{{ column.text.toUpperCase() }}</div>
                <div v-if="!column.disallowSort">
                  <div
                    v-if="sortBy !== column.dataIndex"
                    class="icon-sort"
                    :class="getIconSortClass(sortBy === column.dataIndex)"
                  >
                    <icon-sort-up />
                  </div>
                  <div
                    v-if="sortBy === column.dataIndex"
                    class="icon-sort"
                    :class="getIconSortClass(sortBy === column.dataIndex)"
                  >
                    <icon-sort-down />
                  </div>
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr v-for="item in cleanData(data)" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.text"
            :class="getTableDataClass(column)"
            :style="getTableDataStyles(column, columns, TABLE_PARTIALS.DATA)"
            @click="onClick(column, item)"
            @dblclick="onDblClick(column, item)"
            @mouseenter="onMouseEnter(column, item)"
            @mouseleave="onMouseLeave(column, item)"
          >
            <column-default :data="item[column.dataIndex]" />
          </td>
        </tr>
        <summary-row :data="data" :columns="columns" :summary-key="'summary'" />
      </table>
    </div>
    <paginator-component />
  </div>
</template>

<script>

import IconSortTool from '@/assets/icons/sort-tool.svg?inline'
import IconSortUp from '@/assets/icons/sort-up.svg?inline'
import IconSortDown from '@/assets/icons/sort-down.svg?inline'
import ColumnDefault from './ColumnDefault'
import SummaryRow from './SummaryRow'
import PaginatorComponent from './PaginatorComponent'
import { DEFAULT_LOCKED_COLUMN_STYLES, SORT_TYPES, TABLE_PARTIALS } from './constants'
import { getLockedColumnStyles } from './utils'

export default {
  name: 'GridComponent',
  components: {
    ColumnDefault,
    SummaryRow,
    IconSortUp,
    IconSortDown,
    IconSortTool,
    PaginatorComponent
  },
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
    width: {
      type: [String, Number],
      default: '100%',
      required: false
    },
    height: {
      type: [String, Number],
      default: '100%',
      required: false
    },
    sortFn: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      DEFAULT_LOCKED_COLUMN_STYLES,
      SORT_TYPES,
      sortType: 'DESC',
      sortBy: '',
      TABLE_PARTIALS
    }
  },
  methods: {
    cleanData (data) {
      return data.filter(obj => !obj.omit)
    },
    getColumnTextClass (column) {
      const columnClasses = []

      if (column.dataIndex === this.sortBy) {
        columnClasses.push('sorted-by')
      }

      return columnClasses
    },
    getHeaderClass (column) {
      const headerClasses = []

      if (column.disallowSort) {
        headerClasses.push('header-container-disallowSort')
      } else {
        headerClasses.push('header-container')
      }

      return headerClasses
    },
    getIconSortClass (isSelected) {
      const iconSortClasses = []

      if (isSelected) {
        iconSortClasses.push('icon-sort-selected')
      }

      return iconSortClasses
    },
    getTableClass (columns) {
      return columns.map((column, idx) => column.locked
        ? `sticky-column-${++idx}`
        : 'default-column')
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
    getTableHeaderClass (column) {
      const tableHeaderClasses = []

      if (column.lastLocked) {
        tableHeaderClasses.push('last-locked')
      }

      return tableHeaderClasses
    },
    getTableHeaderStyles (column, columns, tablePart) {
      const tableHeaderStyles = []

      if (column.customStyles) {
        tableHeaderStyles.push(column.customStyles.header)
      }

      if (column.locked) {
        const calculatedLockedStyles = getLockedColumnStyles(column, columns, tablePart)

        tableHeaderStyles.push({
          ...DEFAULT_LOCKED_COLUMN_STYLES,
          ...calculatedLockedStyles
        })
      }

      return tableHeaderStyles
    },
    handleSort (sortBy) {
      this.sortFn(sortBy)

      if (this.sortBy === sortBy) {
        this.sortBy = ''
      } else {
        this.sortBy = sortBy
      }
    },
    onClick (column, rowData) {
      column?.listeners?.click(column, rowData)
    },
    onDblClick (column, rowData) {
      column?.listeners?.dblclick(column, rowData)
    },
    onMouseEnter (column, rowData) {
      column?.listeners?.mouseenter(column, rowData)
    },
    onMouseLeave (column, rowData) {
      column?.listeners?.mouseleave(column, rowData)
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 8px;
  width: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #dfdfdf;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cdcdcd;
}
.column-text {
  display: grid;
  grid-template-columns: auto auto;
  align-items: start;
}
.default-column {
  background: #fcfcfc;
}
.header-container {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  cursor: pointer;
}
.header-container-disallowSort {
  text-align: center;
}
.icon-sort polygon {
  fill: #7c7c7c !important;
  stroke: #7c7c7c !important;
}
.icon-sort-selected polygon {
  fill: #649dd1 !important;
  stroke: #649dd1 !important;
}
.last-locked {
  box-shadow: rgba(136, 165, 191, 0.48) 6px 16px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.sorted-by {
  color: #649dd1;
}
table {
  text-align: center;
  border-spacing: 0;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin: 20px 0 20px 0;
}
table th,
table td {
  white-space: nowrap;
  padding: 10px 20px;
  font-weight: 100;
  font-family: "DM Sans", "Open Sans", Helvetica, sans-serif;
  color: black;
  max-width: 200px;
  min-width: 200px;
  border-bottom: 1px solid #e4e4e4;
  font-size: 14px;
}
table th {
  font-weight: 700;
  font-size: 12px;
  color: #7c7c7c;
}
table tr th:first-child {
  z-index: 11;
}
table tr th {
  position: sticky;
  top: 0;
  z-index: 9;
  background: #fff;
}
</style>
