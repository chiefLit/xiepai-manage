
<template>
  <div class="express-info-wrapper">
    <el-timeline :reverse="false">
      <el-timeline-item v-for="(item, index) in list" :key="index" :timestamp="item.datetime">
        {{item.remark}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.express-info-wrapper {
  margin-top: 20px;
}
</style>