<template name="component-name">
  <el-card class="module-card" header="待收物流信息" shadow="never">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="wp30 name">物流公司</div>
        <div class="wp70 value">{{data.toStoreExpressName}}</div>
      </el-col>
      <el-col :span="6">
        <div class="wp30 name">物流单号</div>
        <div class="wp70 value">{{data.toStoreExpressNumber}}</div>
      </el-col>
    </el-row>
    
    <expressInfo v-if="orderExpressLog.length" :list.sync="orderExpressLog" />
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
        trend: 0
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