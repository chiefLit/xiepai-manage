<template name="component-name">
  <div class="detail-base-info-wrapper">
    <el-card class="module-card" header="基本信息" shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class=" name">订单编号</div>
          <div class=" value">{{data.number}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class=" name">下单日期</div>
          <div class=" value">{{data.applyTime|parseTime}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">渠道</div>
          <div class=" value">{{channelToValue(data.channel)}}</div>
        </el-col>
        <!-- </el-row>

      <el-row :gutter="20"> -->
        <el-col :span="6">
          <div class=" name">用户姓名</div>
          <div class=" value">{{data.phone}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">手机号</div>
          <div class=" value">{{data.phone}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class=" name">订单状态</div>
          <div class=" value">{{statusToValue(data.status)}}</div>
        </el-col>
        <el-col :span="6">
          <div class=" name">订单关闭时间</div>
          <div class=" value">{{data.endTime|parseTime}}</div>
        </el-col>
      </el-row>
      <el-divider content-position="left">收货信息</el-divider>
      <template v-if="data.userAddressVo">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class=" name">收货人姓名</div>
            <div class=" value">{{data.userAddressVo.linkName}}</div>
          </el-col>
          <el-col :span="6">
            <div class=" name">手机号码</div>
            <div class=" value">{{data.userAddressVo.phone}}</div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="18">
            <div class=" name">详细地址</div>
            <div class=" value">{{data.userAddressVo.provinceName}} {{data.userAddressVo.cityName}} {{data.userAddressVo.countyName}} {{data.userAddressVo.address}}</div>
          </el-col>
        </el-row>
      </template>

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