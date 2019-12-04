<template name="component-name">
  <div class="detail-order-detail-wrapper">
    <el-card class="module-card" header="订单内容" shadow="never">
      <el-tabs shadow="never">
        <el-tab-pane v-for="(item, index) in data.orderSubVoList" :key="index" :label='item.goodzTitle'>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class=" name">清洗方式</div>
              <div class="value">
                <template v-for="(sub, subIndex) in item.serviceDetailList">
                  <div class="mr20" :key="subIndex" v-if="sub.classifyCode === '000001'">
                    {{sub.serviceName}} {{sub.price}}
                  </div>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class=" name">护理项目</div>
              <div class="value">
                <template v-for="(sub, subIndex) in item.serviceDetailList">
                  <div class="mr20" :key="subIndex" v-if="sub.classifyCode === '000002'">
                    {{sub.serviceName}} {{sub.price}}
                  </div>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row class="image-card-container" :gutter="20">
            <template v-for="(sub, subIndex) in item.serviceImageList">
              <el-card class="image-card" :body-style="{ padding: '0px' }" :key="subIndex" v-if="sub.step === 0" shadow="never">
                <el-image :src="sub.url" fit="cover" :preview-src-list="[sub.url]"></el-image>
                <div class="tacenter fs14">
                  <span>{{aspectToValue(sub.aspect)}}</span>
                </div>
              </el-card>
            </template>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-row :gutter="20" v-if="data.userAddressVo">
        <el-col :span="6">
          <div class=" name">收货人姓名</div>
          <div class=" value">{{data.userAddressVo.linkName}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">平台优惠</div>
          <div class=" value">{{data.userAddressVo.linkName}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">平台优惠说明</div>
          <div class=" value">--</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">优惠券</div>
          <div class=" value">{{data.couponAmount}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class=" name">平台钱包支付</div>
          <div class=" value">--</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">用户实际支付</div>
          <div class=" value">{{data.realPayPrice}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">支付订单号</div>
          <div class=" value">{{data.payOrderNumber}}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
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
.service-item {
  padding: 5px 15px;
}
.el-tabs {
  margin: 0 20px;
}
</style>