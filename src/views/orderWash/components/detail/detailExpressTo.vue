<template name="component-name">
  <el-card class="module-card" header="寄回物流信息" shadow="never">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="wp30 name">物流公司</div>
        <div class="wp70 value">{{data.toUserExpressName}}</div>
      </el-col>
      <el-col :span="6">
        <div class="wp30 name">物流单号</div>
        <div class="wp70 value">{{data.toUserExpressNumber}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="wp30 name">收货地址</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="wp30 name">收货人姓名</div>
        <div class="wp70 value">{{data.toUserExpressName}}</div>
      </el-col>
      <el-col :span="6">
        <div class="wp30 name">手机号码</div>
        <div class="wp70 value">{{data.toUserExpressNumber}}</div>
      </el-col>
      <el-col :span="12">
        <div class="wp30 name">详情地址</div>
        <div class="wp70 value">{{data.toUserExpressNumber}}</div>
      </el-col>
    </el-row>
    <!-- <div class="iframe-box">
      <iframe src="https://wwww.baidu.com" height="500" width="100%"></iframe>
    </div> -->
  </el-card>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      statusToValue,
      channelToValue,
      aspectToValue
    }
  },
}
</script>
<style lang="scss" scoped>
.iframe-box {
  // padding: 5px 0px;
  iframe {
    border: 1px solid #ebeef5;
  }
}
</style>