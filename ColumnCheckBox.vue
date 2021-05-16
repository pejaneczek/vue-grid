<template>
  <div>
    <input type="checkbox">
  </div>
</template>

<script>
export default {
  name: 'CheckBoxColumn',
  props: {
    data: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
