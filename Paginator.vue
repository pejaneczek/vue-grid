<template>
  <div>
    <div class="paginator-container">
      <div class="paginator-text">
        {{ barText }}
      </div>
      <div class="paginator-bar">
        <div
          v-for="pagination in paginations"
          :key="pagination"
          class="paginator-bar-item"
          :class="{ active: activeItem === pagination }"
          @click="handleBarItemClick(pagination)"
        >
          <p>
            {{ pagination }}
          </p>
        </div>
      </div>
      <div class="flex" />
      <div class="paginator-page">
        <div class="paginator-page-item">
          {{ pageText }}
          <input type="number" :value="page" />
          {{ totalPageText }} {{ totalPages }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    barText: {
      type: String,
      default: 'Showing',
      required: false
    },
    pageText: {
      type: String,
      default: 'Page',
      required: false
    },
    totalPageText: {
      type: String,
      default: 'of',
      required: false
    },
    paginations: {
      type: Array,
      default: () => [5, 10, 25, 50, 100],
      required: false
    },
    page: {
      type: [String, Number],
      default: 1,
      required: false
    },
    totalPages: {
      type: [String, Number],
      default: 1,
      required: false
    },
    size: {
      type: [String, Number],
      default: 1
      // required: true
    },
    onNext: {
      type: Function,
      default: () => {}
      // required: true
    },
    onPrevious: {
      type: Function,
      default: () => {}
      // required: true
    },
    onPage: {
      type: Function,
      default: () => {}
      // required: true
    }
  },
  data () {
    return {
      activeItem: ''
    }
  },
  methods: {
    handleBarItemClick (activeItem) {
      this.activeItem = activeItem
    }
  }
}

</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
input {
  width: 50px;
}
.paginator-container {
  display: grid;
  grid-template-columns: 5% 20% 55% 20%;
}
.paginator-text {
  padding: 10px 0;
  font-size: 12px;
  color: #929292;
}
.paginator-bar {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background: #f6f6f6;
}
.paginator-bar-item {
  height: 35px;
  text-align: center;
  padding: 10px 0;
  color: #929292;
}
.active,
.paginator-bar-item:hover {
  background: white;
  color: black;
}
.paginator-page-item {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 10px 0;
  font-size: 12px;
  color: #929292;
}
</style>
