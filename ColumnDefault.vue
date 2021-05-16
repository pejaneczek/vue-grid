<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  name: 'ColumnDefault',
  props: {
    data: {
      type: [String, Number],
      default: '-',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
