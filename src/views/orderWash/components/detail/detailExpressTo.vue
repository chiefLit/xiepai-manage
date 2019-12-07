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
    <el-divider content-position="left">收货信息</el-divider>
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
        <div class="wp30 name">详细地址</div>
        <div class="wp70 value">{{data.toUserExpressNumber}}</div>
      </el-col>
    </el-row>
    <expressInfo :list="orderExpressLog" />
    <!-- <div class="iframe-box">
      <iframe src="https://wwww.baidu.com" height="500" width="100%"></iframe>
    </div> -->
  </el-card>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
import expressInfo from './expressInfo'
import * as orderApi from '@/api/order'
export default {
  components: { expressInfo },
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
      aspectToValue,

      orderExpressLog: []
    }
  },
  mounted() {
    this.findOrderExpressLog()
  },
  methods: {
    async findOrderExpressLog() {
      // 走向 0：用户寄给门店 1：门店寄给用户
      const data = await orderApi.findOrderExpressLog({
        orderId: this.data.id,
        trend: 1
      })
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        const expressData = JSON.parse(data.object.content);
        this.orderExpressLog = expressData.result.list;
      }
    }
  }
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