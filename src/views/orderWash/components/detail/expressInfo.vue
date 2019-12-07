
<template>
  <div class="express-info-wrapper">
    <div class="" v-if="data.resultcode !== '200'">{{data.reason}}</div>
    <el-timeline :reverse="false" v-if="data.resultcode === '200' && data.result.length">
      <el-timeline-item v-for="(item, index) in data.result" :key="index" :timestamp="item.datetime">
        {{item.remark}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  
}
</script>
<style lang="scss" scoped>
.express-info-wrapper {
  margin-top: 20px;
}
</style>